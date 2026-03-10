import { Hono } from "npm:hono";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { createHash, randomBytes } from "node:crypto";

const app = new Hono();

// Helper to get authenticated user and tenant
async function getAuthContext(authHeader: string | null) {
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

  // Get user profile with tenant and role info
  const { data: profile } = await supabase
    .from('users')
    .select('*, tenants(*)')
    .eq('id', user.id)
    .single();

  return { user, profile, supabase };
}

// Dashboard Overview Stats
app.get("/stats", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;

    // Get try-ons this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: tryOnsCount } = await supabase
      .from('try_on_jobs')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .gte('created_at', startOfMonth.toISOString());

    // Get success rate
    const { data: jobs } = await supabase
      .from('try_on_jobs')
      .select('status')
      .eq('tenant_id', tenantId)
      .gte('created_at', startOfMonth.toISOString());

    const completedJobs = jobs?.filter(j => j.status === 'completed').length || 0;
    const totalJobs = jobs?.length || 1;
    const successRate = (completedJobs / totalJobs) * 100;

    // Get average latency
    const { data: completedJobsData } = await supabase
      .from('try_on_jobs')
      .select('latency_ms')
      .eq('tenant_id', tenantId)
      .eq('status', 'completed')
      .not('latency_ms', 'is', null);

    const avgLatency = completedJobsData?.length
      ? completedJobsData.reduce((sum, j) => sum + (j.latency_ms || 0), 0) / completedJobsData.length
      : 0;

    // Get active garments
    const { count: activeGarments } = await supabase
      .from('garments')
      .select('*', { count: 'exact', head: true })
      .eq('tenant_id', tenantId)
      .eq('status', 'active');

    // Get recent activity
    const { data: recentJobs } = await supabase
      .from('try_on_jobs')
      .select('*, garments(name, category)')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(10);

    return c.json({
      stats: {
        tryOnsThisMonth: tryOnsCount || 0,
        successRate: Math.round(successRate),
        avgLatency: Math.round(avgLatency),
        activeGarments: activeGarments || 0,
      },
      recentActivity: recentJobs || [],
    });
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    return c.json({ error: error.message }, 401);
  }
});

// Garments - List
app.get("/garments", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;
    const search = c.req.query('search') || '';
    const status = c.req.query('status') || 'active';

    let query = supabase
      .from('garments')
      .select('*')
      .eq('tenant_id', tenantId)
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return c.json({ garments: data || [] });
  } catch (error: any) {
    console.error('Error fetching garments:', error);
    return c.json({ error: error.message }, 401);
  }
});

// Garments - Create
app.post("/garments", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;
    const { name, category, image_url } = await c.req.json();

    const { data, error } = await supabase
      .from('garments')
      .insert({
        tenant_id: tenantId,
        name,
        category,
        image_url,
        status: 'active',
      })
      .select()
      .single();

    if (error) throw error;

    return c.json({ garment: data });
  } catch (error: any) {
    console.error('Error creating garment:', error);
    return c.json({ error: error.message }, 400);
  }
});

// Garments - Update
app.put("/garments/:id", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;
    const garmentId = c.req.param('id');
    const updates = await c.req.json();

    const { data, error } = await supabase
      .from('garments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', garmentId)
      .eq('tenant_id', tenantId)
      .select()
      .single();

    if (error) throw error;

    return c.json({ garment: data });
  } catch (error: any) {
    console.error('Error updating garment:', error);
    return c.json({ error: error.message }, 400);
  }
});

// Try-On Jobs - List
app.get("/jobs", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;

    const { data, error } = await supabase
      .from('try_on_jobs')
      .select('*, garments(name, category)')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;

    return c.json({ jobs: data || [] });
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    return c.json({ error: error.message }, 401);
  }
});

// Try-On Jobs - Create
app.post("/jobs", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;
    const { garment_id, user_photo_url } = await c.req.json();

    const { data, error } = await supabase
      .from('try_on_jobs')
      .insert({
        tenant_id: tenantId,
        garment_id,
        user_photo_url,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;

    // Simulate async processing (in production, this would trigger a queue)
    setTimeout(async () => {
      const processingTime = 2000 + Math.random() * 3000;
      const success = Math.random() > 0.1; // 90% success rate

      await new Promise(resolve => setTimeout(resolve, processingTime));

      await supabase
        .from('try_on_jobs')
        .update({
          status: success ? 'completed' : 'failed',
          latency_ms: Math.round(processingTime),
          failure_reason: success ? null : 'Simulated processing error',
          completed_at: new Date().toISOString(),
          result_image_url: success ? user_photo_url : null, // In production, this would be the actual result
        })
        .eq('id', data.id);

      // Log usage
      if (success) {
        await supabase.from('usage_logs').insert({
          tenant_id: tenantId,
          job_id: data.id,
          inference_cost_estimate: 0.05, // Example cost
        });
      }
    }, 100);

    return c.json({ job: data });
  } catch (error: any) {
    console.error('Error creating job:', error);
    return c.json({ error: error.message }, 400);
  }
});

// API Keys - List
app.get("/api-keys", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;

    const { data, error } = await supabase
      .from('api_keys')
      .select('id, key_prefix, name, active, created_at, last_used_at')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ apiKeys: data || [] });
  } catch (error: any) {
    console.error('Error fetching API keys:', error);
    return c.json({ error: error.message }, 401);
  }
});

// API Keys - Generate
app.post("/api-keys", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;
    const { name } = await c.req.json();

    // Generate a secure random key
    const rawKey = `comify_${randomBytes(32).toString('hex')}`;
    const keyHash = createHash('sha256').update(rawKey).digest('hex');
    const keyPrefix = rawKey.substring(0, 15);

    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        tenant_id: tenantId,
        key_hash: keyHash,
        key_prefix: keyPrefix,
        name: name || 'API Key',
        active: true,
      })
      .select()
      .single();

    if (error) throw error;

    // Return the full key only this one time
    return c.json({
      apiKey: {
        ...data,
        raw_key: rawKey, // Only shown once!
      },
    });
  } catch (error: any) {
    console.error('Error generating API key:', error);
    return c.json({ error: error.message }, 400);
  }
});

// API Keys - Revoke
app.delete("/api-keys/:id", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;
    const keyId = c.req.param('id');

    const { error } = await supabase
      .from('api_keys')
      .update({ active: false })
      .eq('id', keyId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error revoking API key:', error);
    return c.json({ error: error.message }, 400);
  }
});

// Team Members - List
app.get("/team", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;

    const { data, error } = await supabase
      .from('users')
      .select('id, email, full_name, role, created_at')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ team: data || [] });
  } catch (error: any) {
    console.error('Error fetching team:', error);
    return c.json({ error: error.message }, 401);
  }
});

// Team Members - Invite
app.post("/team/invite", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;
    const userId = profile?.id;

    // Check if user is brand_admin
    if (profile?.role !== 'brand_admin' && profile?.role !== 'super_admin') {
      return c.json({ error: 'Only brand admins can invite team members' }, 403);
    }

    const { email, role } = await c.req.json();

    // Create invite
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days to accept

    const { data, error } = await supabase
      .from('team_invites')
      .insert({
        tenant_id: tenantId,
        email,
        role,
        invited_by: userId,
        status: 'pending',
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    // In production, send email with invite link

    return c.json({ invite: data });
  } catch (error: any) {
    console.error('Error inviting team member:', error);
    return c.json({ error: error.message }, 400);
  }
});

// Team Members - Remove
app.delete("/team/:id", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;
    const memberId = c.req.param('id');

    // Check if user is brand_admin
    if (profile?.role !== 'brand_admin' && profile?.role !== 'super_admin') {
      return c.json({ error: 'Only brand admins can remove team members' }, 403);
    }

    // Delete user
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', memberId)
      .eq('tenant_id', tenantId);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error removing team member:', error);
    return c.json({ error: error.message }, 400);
  }
});

// Usage Analytics
app.get("/analytics", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;

    // Get last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: jobs } = await supabase
      .from('try_on_jobs')
      .select('status, created_at, latency_ms')
      .eq('tenant_id', tenantId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: true });

    const { data: usageLogs } = await supabase
      .from('usage_logs')
      .select('inference_cost_estimate, timestamp')
      .eq('tenant_id', tenantId)
      .gte('timestamp', thirtyDaysAgo.toISOString());

    // Group by day
    const dailyStats: any = {};
    jobs?.forEach(job => {
      const day = new Date(job.created_at).toISOString().split('T')[0];
      if (!dailyStats[day]) {
        dailyStats[day] = { date: day, tryOns: 0, successful: 0, failed: 0, totalLatency: 0, count: 0 };
      }
      dailyStats[day].tryOns++;
      if (job.status === 'completed') dailyStats[day].successful++;
      if (job.status === 'failed') dailyStats[day].failed++;
      if (job.latency_ms) {
        dailyStats[day].totalLatency += job.latency_ms;
        dailyStats[day].count++;
      }
    });

    const chartData = Object.values(dailyStats).map((day: any) => ({
      date: day.date,
      tryOns: day.tryOns,
      successful: day.successful,
      failed: day.failed,
      avgLatency: day.count > 0 ? Math.round(day.totalLatency / day.count) : 0,
    }));

    const totalCost = usageLogs?.reduce((sum, log) => sum + (Number(log.inference_cost_estimate) || 0), 0) || 0;

    return c.json({
      chartData,
      totalCost: totalCost.toFixed(2),
    });
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return c.json({ error: error.message }, 401);
  }
});

// Upload signed URL for garment images
app.post("/upload-url", async (c) => {
  try {
    const { profile, supabase } = await getAuthContext(c.req.header('Authorization'));
    const tenantId = profile?.tenant_id;
    const { fileName } = await c.req.json();

    const filePath = `${tenantId}/${Date.now()}-${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('make-7c57d885-garments')
      .createSignedUploadUrl(filePath);

    if (error) throw error;

    return c.json({ uploadUrl: data.signedUrl, filePath });
  } catch (error: any) {
    console.error('Error generating upload URL:', error);
    return c.json({ error: error.message }, 400);
  }
});

export default app;
