-- =====================================================
-- Comify AI B2B SaaS Dashboard - Complete Database Schema
-- =====================================================
-- This file contains:
-- 1. All table definitions
-- 2. Helper functions
-- 3. Complete RLS policies for every table
-- 4. Bootstrap flow for first-time setup
-- =====================================================

-- =====================================================
-- STEP 1: CREATE TABLES
-- =====================================================

-- Table: tenants
-- Stores fashion brand accounts
CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL,
  plan_type TEXT DEFAULT 'starter' CHECK (plan_type IN ('starter', 'professional', 'enterprise')),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table: users
-- Extends auth.users with tenant and role information
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'brand_admin', 'brand_user')),
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_tenant_for_role CHECK (
    (role = 'super_admin' AND tenant_id IS NULL) OR
    (role IN ('brand_admin', 'brand_user') AND tenant_id IS NOT NULL)
  )
);

-- Table: garments
-- Fashion products uploaded by brands
CREATE TABLE IF NOT EXISTS garments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('top', 'dress', 'outerwear', 'pants', 'skirt', 'accessories')),
  image_url TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Table: try_on_jobs
-- Virtual try-on processing jobs
CREATE TABLE IF NOT EXISTS try_on_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  garment_id UUID REFERENCES garments(id) ON DELETE SET NULL,
  user_photo_url TEXT NOT NULL,
  result_image_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  failure_reason TEXT,
  latency_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Table: api_keys
-- API keys for programmatic access
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL UNIQUE,
  key_prefix TEXT NOT NULL,
  name TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  last_used_at TIMESTAMPTZ
);

-- Table: usage_logs
-- Tracks usage and costs for billing
CREATE TABLE IF NOT EXISTS usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  job_id UUID REFERENCES try_on_jobs(id) ON DELETE SET NULL,
  inference_cost_estimate NUMERIC(10,4),
  timestamp TIMESTAMPTZ DEFAULT now()
);

-- Table: team_invites
-- Team member invitations
CREATE TABLE IF NOT EXISTS team_invites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('brand_admin', 'brand_user')),
  invited_by UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT now() + INTERVAL '7 days'
);

-- =====================================================
-- STEP 2: CREATE INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_users_tenant ON users(tenant_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

CREATE INDEX IF NOT EXISTS idx_garments_tenant ON garments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_garments_status ON garments(status);
CREATE INDEX IF NOT EXISTS idx_garments_category ON garments(category);

CREATE INDEX IF NOT EXISTS idx_jobs_tenant ON try_on_jobs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON try_on_jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created ON try_on_jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_garment ON try_on_jobs(garment_id);

CREATE INDEX IF NOT EXISTS idx_api_keys_tenant ON api_keys(tenant_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_active ON api_keys(active);

CREATE INDEX IF NOT EXISTS idx_usage_tenant ON usage_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_usage_timestamp ON usage_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_usage_job ON usage_logs(job_id);

CREATE INDEX IF NOT EXISTS idx_invites_tenant ON team_invites(tenant_id);
CREATE INDEX IF NOT EXISTS idx_invites_email ON team_invites(email);
CREATE INDEX IF NOT EXISTS idx_invites_status ON team_invites(status);

-- =====================================================
-- STEP 3: CREATE HELPER FUNCTIONS
-- =====================================================

-- Function: current_user_id
-- Returns the ID of the currently authenticated user
CREATE OR REPLACE FUNCTION current_user_id()
RETURNS UUID AS $$
  SELECT auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Function: current_tenant_id
-- Returns the tenant_id of the currently authenticated user
-- Returns NULL for super_admin or unauthenticated users
CREATE OR REPLACE FUNCTION current_tenant_id()
RETURNS UUID AS $$
  SELECT tenant_id FROM users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Function: current_role
-- Returns the role of the currently authenticated user
-- Returns NULL for unauthenticated users
CREATE OR REPLACE FUNCTION current_role()
RETURNS TEXT AS $$
  SELECT role FROM users WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Function: is_super_admin
-- Returns true if current user is a super admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'super_admin'
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Function: is_brand_admin
-- Returns true if current user is a brand admin or super admin
CREATE OR REPLACE FUNCTION is_brand_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('brand_admin', 'super_admin')
  );
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Function: can_access_tenant
-- Returns true if user can access the given tenant_id
CREATE OR REPLACE FUNCTION can_access_tenant(tenant_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT 
    CASE 
      WHEN is_super_admin() THEN true
      WHEN current_tenant_id() = tenant_uuid THEN true
      ELSE false
    END;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Function: update_updated_at_column
-- Trigger function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- STEP 4: CREATE TRIGGERS
-- =====================================================

-- Triggers to automatically update updated_at columns
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_garments_updated_at BEFORE UPDATE ON garments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STEP 5: ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE garments ENABLE ROW LEVEL SECURITY;
ALTER TABLE try_on_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_invites ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- STEP 6: CREATE RLS POLICIES - TENANTS TABLE
-- =====================================================

-- DROP existing policies if they exist
DROP POLICY IF EXISTS "Tenants: Super admins can view all" ON tenants;
DROP POLICY IF EXISTS "Tenants: Users can view their own tenant" ON tenants;
DROP POLICY IF EXISTS "Tenants: Super admins can create" ON tenants;
DROP POLICY IF EXISTS "Tenants: Super admins can update" ON tenants;
DROP POLICY IF EXISTS "Tenants: Super admins can delete" ON tenants;

-- SELECT policies
CREATE POLICY "Tenants: Super admins can view all"
ON tenants FOR SELECT
USING (is_super_admin());

CREATE POLICY "Tenants: Users can view their own tenant"
ON tenants FOR SELECT
USING (id = current_tenant_id());

-- INSERT policies
CREATE POLICY "Tenants: Super admins can create"
ON tenants FOR INSERT
WITH CHECK (is_super_admin());

-- UPDATE policies
CREATE POLICY "Tenants: Super admins can update"
ON tenants FOR UPDATE
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- DELETE policies
CREATE POLICY "Tenants: Super admins can delete"
ON tenants FOR DELETE
USING (is_super_admin());

-- =====================================================
-- STEP 7: CREATE RLS POLICIES - USERS TABLE
-- =====================================================

DROP POLICY IF EXISTS "Users: Super admins can view all" ON users;
DROP POLICY IF EXISTS "Users: Users can view their tenant members" ON users;
DROP POLICY IF EXISTS "Users: Users can view themselves" ON users;
DROP POLICY IF EXISTS "Users: Super admins can create users" ON users;
DROP POLICY IF EXISTS "Users: Brand admins can create users in their tenant" ON users;
DROP POLICY IF EXISTS "Users: Users can update themselves" ON users;
DROP POLICY IF EXISTS "Users: Brand admins can update their tenant users" ON users;
DROP POLICY IF EXISTS "Users: Super admins can update any user" ON users;
DROP POLICY IF EXISTS "Users: Brand admins can delete their tenant users" ON users;
DROP POLICY IF EXISTS "Users: Super admins can delete any user" ON users;

-- SELECT policies
CREATE POLICY "Users: Super admins can view all"
ON users FOR SELECT
USING (is_super_admin());

CREATE POLICY "Users: Users can view their tenant members"
ON users FOR SELECT
USING (tenant_id = current_tenant_id() AND tenant_id IS NOT NULL);

CREATE POLICY "Users: Users can view themselves"
ON users FOR SELECT
USING (id = auth.uid());

-- INSERT policies
CREATE POLICY "Users: Super admins can create users"
ON users FOR INSERT
WITH CHECK (is_super_admin());

CREATE POLICY "Users: Brand admins can create users in their tenant"
ON users FOR INSERT
WITH CHECK (
  is_brand_admin() 
  AND tenant_id = current_tenant_id()
  AND role IN ('brand_admin', 'brand_user')
);

-- UPDATE policies
CREATE POLICY "Users: Users can update themselves"
ON users FOR UPDATE
USING (id = auth.uid())
WITH CHECK (
  id = auth.uid() 
  AND tenant_id = current_tenant_id()
  AND role = (SELECT role FROM users WHERE id = auth.uid())
);

CREATE POLICY "Users: Brand admins can update their tenant users"
ON users FOR UPDATE
USING (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
  AND id != auth.uid()
)
WITH CHECK (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
);

CREATE POLICY "Users: Super admins can update any user"
ON users FOR UPDATE
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- DELETE policies
CREATE POLICY "Users: Brand admins can delete their tenant users"
ON users FOR DELETE
USING (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
  AND id != auth.uid()
  AND role != 'super_admin'
);

CREATE POLICY "Users: Super admins can delete any user"
ON users FOR DELETE
USING (is_super_admin());

-- =====================================================
-- STEP 8: CREATE RLS POLICIES - GARMENTS TABLE
-- =====================================================

DROP POLICY IF EXISTS "Garments: Users can view their tenant garments" ON garments;
DROP POLICY IF EXISTS "Garments: Super admins can view all" ON garments;
DROP POLICY IF EXISTS "Garments: Users can create in their tenant" ON garments;
DROP POLICY IF EXISTS "Garments: Users can update their tenant garments" ON garments;
DROP POLICY IF EXISTS "Garments: Super admins can update all" ON garments;
DROP POLICY IF EXISTS "Garments: Brand admins can delete their tenant garments" ON garments;
DROP POLICY IF EXISTS "Garments: Super admins can delete all" ON garments;

-- SELECT policies
CREATE POLICY "Garments: Users can view their tenant garments"
ON garments FOR SELECT
USING (can_access_tenant(tenant_id));

CREATE POLICY "Garments: Super admins can view all"
ON garments FOR SELECT
USING (is_super_admin());

-- INSERT policies
CREATE POLICY "Garments: Users can create in their tenant"
ON garments FOR INSERT
WITH CHECK (tenant_id = current_tenant_id());

-- UPDATE policies
CREATE POLICY "Garments: Users can update their tenant garments"
ON garments FOR UPDATE
USING (can_access_tenant(tenant_id))
WITH CHECK (can_access_tenant(tenant_id));

CREATE POLICY "Garments: Super admins can update all"
ON garments FOR UPDATE
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- DELETE policies
CREATE POLICY "Garments: Brand admins can delete their tenant garments"
ON garments FOR DELETE
USING (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
);

CREATE POLICY "Garments: Super admins can delete all"
ON garments FOR DELETE
USING (is_super_admin());

-- =====================================================
-- STEP 9: CREATE RLS POLICIES - TRY_ON_JOBS TABLE
-- =====================================================

DROP POLICY IF EXISTS "Jobs: Users can view their tenant jobs" ON try_on_jobs;
DROP POLICY IF EXISTS "Jobs: Super admins can view all" ON try_on_jobs;
DROP POLICY IF EXISTS "Jobs: Users can create in their tenant" ON try_on_jobs;
DROP POLICY IF EXISTS "Jobs: System can update jobs" ON try_on_jobs;
DROP POLICY IF EXISTS "Jobs: Super admins can update all" ON try_on_jobs;
DROP POLICY IF EXISTS "Jobs: Brand admins can delete their tenant jobs" ON try_on_jobs;
DROP POLICY IF EXISTS "Jobs: Super admins can delete all" ON try_on_jobs;

-- SELECT policies
CREATE POLICY "Jobs: Users can view their tenant jobs"
ON try_on_jobs FOR SELECT
USING (can_access_tenant(tenant_id));

CREATE POLICY "Jobs: Super admins can view all"
ON try_on_jobs FOR SELECT
USING (is_super_admin());

-- INSERT policies
CREATE POLICY "Jobs: Users can create in their tenant"
ON try_on_jobs FOR INSERT
WITH CHECK (tenant_id = current_tenant_id());

-- UPDATE policies (system needs to update job status)
CREATE POLICY "Jobs: System can update jobs"
ON try_on_jobs FOR UPDATE
USING (can_access_tenant(tenant_id))
WITH CHECK (can_access_tenant(tenant_id));

CREATE POLICY "Jobs: Super admins can update all"
ON try_on_jobs FOR UPDATE
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- DELETE policies
CREATE POLICY "Jobs: Brand admins can delete their tenant jobs"
ON try_on_jobs FOR DELETE
USING (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
);

CREATE POLICY "Jobs: Super admins can delete all"
ON try_on_jobs FOR DELETE
USING (is_super_admin());

-- =====================================================
-- STEP 10: CREATE RLS POLICIES - API_KEYS TABLE
-- =====================================================

DROP POLICY IF EXISTS "API Keys: Users can view their tenant keys" ON api_keys;
DROP POLICY IF EXISTS "API Keys: Super admins can view all" ON api_keys;
DROP POLICY IF EXISTS "API Keys: Brand admins can create keys" ON api_keys;
DROP POLICY IF EXISTS "API Keys: Super admins can create keys" ON api_keys;
DROP POLICY IF EXISTS "API Keys: Brand admins can update their tenant keys" ON api_keys;
DROP POLICY IF EXISTS "API Keys: Super admins can update all" ON api_keys;
DROP POLICY IF EXISTS "API Keys: Brand admins can delete their tenant keys" ON api_keys;
DROP POLICY IF EXISTS "API Keys: Super admins can delete all" ON api_keys;

-- SELECT policies
CREATE POLICY "API Keys: Users can view their tenant keys"
ON api_keys FOR SELECT
USING (can_access_tenant(tenant_id));

CREATE POLICY "API Keys: Super admins can view all"
ON api_keys FOR SELECT
USING (is_super_admin());

-- INSERT policies (only brand admins and super admins)
CREATE POLICY "API Keys: Brand admins can create keys"
ON api_keys FOR INSERT
WITH CHECK (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
);

CREATE POLICY "API Keys: Super admins can create keys"
ON api_keys FOR INSERT
WITH CHECK (is_super_admin());

-- UPDATE policies (for revoking keys)
CREATE POLICY "API Keys: Brand admins can update their tenant keys"
ON api_keys FOR UPDATE
USING (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
)
WITH CHECK (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
);

CREATE POLICY "API Keys: Super admins can update all"
ON api_keys FOR UPDATE
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- DELETE policies
CREATE POLICY "API Keys: Brand admins can delete their tenant keys"
ON api_keys FOR DELETE
USING (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
);

CREATE POLICY "API Keys: Super admins can delete all"
ON api_keys FOR DELETE
USING (is_super_admin());

-- =====================================================
-- STEP 11: CREATE RLS POLICIES - USAGE_LOGS TABLE
-- =====================================================

DROP POLICY IF EXISTS "Usage: Users can view their tenant usage" ON usage_logs;
DROP POLICY IF EXISTS "Usage: Super admins can view all" ON usage_logs;
DROP POLICY IF EXISTS "Usage: System can create usage logs" ON usage_logs;
DROP POLICY IF EXISTS "Usage: Super admins can delete all" ON usage_logs;

-- SELECT policies
CREATE POLICY "Usage: Users can view their tenant usage"
ON usage_logs FOR SELECT
USING (can_access_tenant(tenant_id));

CREATE POLICY "Usage: Super admins can view all"
ON usage_logs FOR SELECT
USING (is_super_admin());

-- INSERT policies (system creates usage logs)
CREATE POLICY "Usage: System can create usage logs"
ON usage_logs FOR INSERT
WITH CHECK (true); -- System service role will create these

-- No UPDATE policies (usage logs are immutable)

-- DELETE policies (only super admin for cleanup)
CREATE POLICY "Usage: Super admins can delete all"
ON usage_logs FOR DELETE
USING (is_super_admin());

-- =====================================================
-- STEP 12: CREATE RLS POLICIES - TEAM_INVITES TABLE
-- =====================================================

DROP POLICY IF EXISTS "Invites: Users can view their tenant invites" ON team_invites;
DROP POLICY IF EXISTS "Invites: Super admins can view all" ON team_invites;
DROP POLICY IF EXISTS "Invites: Brand admins can create invites" ON team_invites;
DROP POLICY IF EXISTS "Invites: Super admins can create invites" ON team_invites;
DROP POLICY IF EXISTS "Invites: Brand admins can update their tenant invites" ON team_invites;
DROP POLICY IF EXISTS "Invites: Super admins can update all" ON team_invites;
DROP POLICY IF EXISTS "Invites: Brand admins can delete their tenant invites" ON team_invites;
DROP POLICY IF EXISTS "Invites: Super admins can delete all" ON team_invites;

-- SELECT policies
CREATE POLICY "Invites: Users can view their tenant invites"
ON team_invites FOR SELECT
USING (can_access_tenant(tenant_id));

CREATE POLICY "Invites: Super admins can view all"
ON team_invites FOR SELECT
USING (is_super_admin());

-- INSERT policies (only brand admins)
CREATE POLICY "Invites: Brand admins can create invites"
ON team_invites FOR INSERT
WITH CHECK (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
);

CREATE POLICY "Invites: Super admins can create invites"
ON team_invites FOR INSERT
WITH CHECK (is_super_admin());

-- UPDATE policies (for accepting/expiring invites)
CREATE POLICY "Invites: Brand admins can update their tenant invites"
ON team_invites FOR UPDATE
USING (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
)
WITH CHECK (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
);

CREATE POLICY "Invites: Super admins can update all"
ON team_invites FOR UPDATE
USING (is_super_admin())
WITH CHECK (is_super_admin());

-- DELETE policies
CREATE POLICY "Invites: Brand admins can delete their tenant invites"
ON team_invites FOR DELETE
USING (
  is_brand_admin()
  AND tenant_id = current_tenant_id()
);

CREATE POLICY "Invites: Super admins can delete all"
ON team_invites FOR DELETE
USING (is_super_admin());

-- =====================================================
-- STEP 13: GRANT PERMISSIONS
-- =====================================================

-- Grant usage on tables to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO anon;

-- Grant permissions on all tables
GRANT SELECT, INSERT, UPDATE, DELETE ON tenants TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON garments TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON try_on_jobs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON api_keys TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON usage_logs TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON team_invites TO authenticated;

-- Grant sequence permissions
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- =====================================================
-- COMPLETE SCHEMA SETUP
-- =====================================================

-- Schema version and metadata
COMMENT ON TABLE tenants IS 'Fashion brand accounts (multi-tenant)';
COMMENT ON TABLE users IS 'User accounts with role-based access';
COMMENT ON TABLE garments IS 'Product catalog for virtual try-on';
COMMENT ON TABLE try_on_jobs IS 'Virtual try-on processing jobs';
COMMENT ON TABLE api_keys IS 'API keys for programmatic access';
COMMENT ON TABLE usage_logs IS 'Usage tracking for billing';
COMMENT ON TABLE team_invites IS 'Team member invitations';

-- End of schema setup
