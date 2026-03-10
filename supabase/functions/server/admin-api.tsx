import { Hono } from "npm:hono";
import { createClient } from "jsr:@supabase/supabase-js@2";

const app = new Hono();

// Helper to verify super admin
async function verifySuperAdmin(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.split(' ')[1];
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    throw new Error('Unauthorized');
  }

  const { data: profile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'super_admin') {
    throw new Error('Forbidden: Super admin access required');
  }

  return { user, supabase };
}

// Get all tenants
app.get("/tenants", async (c) => {
  try {
    const { supabase } = await verifySuperAdmin(c.req.header('Authorization'));

    const { data: tenants, error } = await supabase
      .from('tenants')
      .select(`
        *,
        users(count),
        garments(count),
        try_on_jobs(count)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Get usage stats for each tenant
    const tenantsWithStats = await Promise.all(
      (tenants || []).map(async (tenant) => {
        const { count: jobCount } = await supabase
          .from('try_on_jobs')
          .select('*', { count: 'exact', head: true })
          .eq('tenant_id', tenant.id);

        const { data: usageLogs } = await supabase
          .from('usage_logs')
          .select('inference_cost_estimate')
          .eq('tenant_id', tenant.id);

        const totalCost = usageLogs?.reduce(
          (sum, log) => sum + (Number(log.inference_cost_estimate) || 0),
          0
        ) || 0;

        return {
          ...tenant,
          stats: {
            totalJobs: jobCount || 0,
            totalCost: totalCost.toFixed(2),
          },
        };
      })
    );

    return c.json({ tenants: tenantsWithStats });
  } catch (error: any) {
    console.error('Error fetching tenants:', error);
    return c.json({ error: error.message }, error.message.includes('Forbidden') ? 403 : 401);
  }
});

// Update tenant status
app.put("/tenants/:id", async (c) => {
  try {
    const { supabase } = await verifySuperAdmin(c.req.header('Authorization'));
    const tenantId = c.req.param('id');
    const { active, plan_type } = await c.req.json();

    const updates: any = {};
    if (typeof active !== 'undefined') updates.active = active;
    if (plan_type) updates.plan_type = plan_type;

    const { data, error } = await supabase
      .from('tenants')
      .update(updates)
      .eq('id', tenantId)
      .select()
      .single();

    if (error) throw error;

    return c.json({ tenant: data });
  } catch (error: any) {
    console.error('Error updating tenant:', error);
    return c.json({ error: error.message }, 400);
  }
});

// Get all jobs (across all tenants)
app.get("/jobs", async (c) => {
  try {
    const { supabase } = await verifySuperAdmin(c.req.header('Authorization'));
    const tenantFilter = c.req.query('tenant_id');

    let query = supabase
      .from('try_on_jobs')
      .select('*, tenants(brand_name), garments(name, category)')
      .order('created_at', { ascending: false })
      .limit(200);

    if (tenantFilter) {
      query = query.eq('tenant_id', tenantFilter);
    }

    const { data, error } = await query;

    if (error) throw error;

    return c.json({ jobs: data || [] });
  } catch (error: any) {
    console.error('Error fetching all jobs:', error);
    return c.json({ error: error.message }, error.message.includes('Forbidden') ? 403 : 401);
  }
});

// Retry failed job
app.post("/jobs/:id/retry", async (c) => {
  try {
    const { supabase } = await verifySuperAdmin(c.req.header('Authorization'));
    const jobId = c.req.param('id');

    const { data, error } = await supabase
      .from('try_on_jobs')
      .update({
        status: 'pending',
        failure_reason: null,
        result_image_url: null,
      })
      .eq('id', jobId)
      .select()
      .single();

    if (error) throw error;

    return c.json({ job: data });
  } catch (error: any) {
    console.error('Error retrying job:', error);
    return c.json({ error: error.message }, 400);
  }
});

// System health stats
app.get("/health", async (c) => {
  try {
    const { supabase } = await verifySuperAdmin(c.req.header('Authorization'));

    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Active jobs (pending or processing)
    const { count: activeJobs } = await supabase
      .from('try_on_jobs')
      .select('*', { count: 'exact', head: true })
      .in('status', ['pending', 'processing']);

    // Failed jobs in last 24h
    const { count: failedJobs } = await supabase
      .from('try_on_jobs')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'failed')
      .gte('created_at', last24h.toISOString());

    // Total jobs in last 24h
    const { count: totalJobs24h } = await supabase
      .from('try_on_jobs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', last24h.toISOString());

    // Active tenants
    const { count: activeTenants } = await supabase
      .from('tenants')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);

    return c.json({
      health: {
        activeJobs: activeJobs || 0,
        failedJobsLast24h: failedJobs || 0,
        totalJobsLast24h: totalJobs24h || 0,
        activeTenants: activeTenants || 0,
        queueLength: Math.floor(Math.random() * 10), // Mocked
        gpuStatus: 'healthy', // Mocked
      },
    });
  } catch (error: any) {
    console.error('Error fetching system health:', error);
    return c.json({ error: error.message }, error.message.includes('Forbidden') ? 403 : 401);
  }
});

// Billing overview
app.get("/billing", async (c) => {
  try {
    const { supabase } = await verifySuperAdmin(c.req.header('Authorization'));

    const { data: tenants } = await supabase
      .from('tenants')
      .select('id, brand_name, plan_type, active')
      .eq('active', true);

    const billingData = await Promise.all(
      (tenants || []).map(async (tenant) => {
        const { data: logs } = await supabase
          .from('usage_logs')
          .select('inference_cost_estimate');

        const totalCost = logs?.reduce(
          (sum, log) => sum + (Number(log.inference_cost_estimate) || 0),
          0
        ) || 0;

        const { count: jobCount } = await supabase
          .from('try_on_jobs')
          .select('*', { count: 'exact', head: true })
          .eq('tenant_id', tenant.id);

        return {
          ...tenant,
          totalCost: totalCost.toFixed(2),
          jobCount: jobCount || 0,
        };
      })
    );

    return c.json({ billing: billingData });
  } catch (error: any) {
    console.error('Error fetching billing:', error);
    return c.json({ error: error.message }, error.message.includes('Forbidden') ? 403 : 401);
  }
});

export default app;
