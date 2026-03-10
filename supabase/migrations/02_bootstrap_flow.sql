-- =====================================================
-- BOOTSTRAP FLOW - First-Time User Creation
-- =====================================================
-- This script provides secure methods to create initial users
-- and tenants for the Comify AI B2B SaaS platform
-- =====================================================

-- =====================================================
-- BOOTSTRAP FUNCTION 1: Create Super Admin
-- =====================================================
-- This function creates the first super admin account
-- Run this ONCE after creating your first auth user via Supabase Auth

CREATE OR REPLACE FUNCTION bootstrap_create_super_admin(
  auth_user_id UUID,
  admin_email TEXT,
  admin_name TEXT
)
RETURNS UUID AS $$
DECLARE
  created_user_id UUID;
BEGIN
  -- Check if super admin already exists
  IF EXISTS (SELECT 1 FROM users WHERE role = 'super_admin') THEN
    RAISE EXCEPTION 'Super admin already exists. Only one super admin should be created via bootstrap.';
  END IF;

  -- Verify the auth user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = auth_user_id) THEN
    RAISE EXCEPTION 'Auth user with ID % does not exist. Create user in Supabase Auth first.', auth_user_id;
  END IF;

  -- Verify user doesn't already exist in users table
  IF EXISTS (SELECT 1 FROM users WHERE id = auth_user_id) THEN
    RAISE EXCEPTION 'User already exists in users table.';
  END IF;

  -- Create super admin user
  INSERT INTO users (id, tenant_id, role, email, full_name)
  VALUES (auth_user_id, NULL, 'super_admin', admin_email, admin_name)
  RETURNING id INTO created_user_id;

  RAISE NOTICE 'Super admin created successfully with ID: %', created_user_id;
  
  RETURN created_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- BOOTSTRAP FUNCTION 2: Create Tenant with Brand Admin
-- =====================================================
-- This function creates a new tenant and its first brand admin
-- Can be called by super admin or during onboarding

CREATE OR REPLACE FUNCTION bootstrap_create_tenant_with_admin(
  auth_user_id UUID,
  brand_name TEXT,
  admin_email TEXT,
  admin_name TEXT,
  plan_type TEXT DEFAULT 'starter'
)
RETURNS TABLE(tenant_id UUID, user_id UUID) AS $$
DECLARE
  new_tenant_id UUID;
  new_user_id UUID;
BEGIN
  -- Validate plan type
  IF plan_type NOT IN ('starter', 'professional', 'enterprise') THEN
    RAISE EXCEPTION 'Invalid plan_type. Must be: starter, professional, or enterprise';
  END IF;

  -- Verify the auth user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = auth_user_id) THEN
    RAISE EXCEPTION 'Auth user with ID % does not exist. Create user in Supabase Auth first.', auth_user_id;
  END IF;

  -- Verify user doesn't already exist in users table
  IF EXISTS (SELECT 1 FROM users WHERE id = auth_user_id) THEN
    RAISE EXCEPTION 'User already exists in users table.';
  END IF;

  -- Create tenant
  INSERT INTO tenants (brand_name, plan_type, active)
  VALUES (brand_name, plan_type, true)
  RETURNING id INTO new_tenant_id;

  RAISE NOTICE 'Tenant created: % (ID: %)', brand_name, new_tenant_id;

  -- Create brand admin user
  INSERT INTO users (id, tenant_id, role, email, full_name)
  VALUES (auth_user_id, new_tenant_id, 'brand_admin', admin_email, admin_name)
  RETURNING id INTO new_user_id;

  RAISE NOTICE 'Brand admin created: % (ID: %)', admin_name, new_user_id;

  RETURN QUERY SELECT new_tenant_id, new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- BOOTSTRAP FUNCTION 3: Add User to Existing Tenant
-- =====================================================
-- This function adds a new user to an existing tenant
-- Used when accepting team invites or adding users

CREATE OR REPLACE FUNCTION bootstrap_add_user_to_tenant(
  auth_user_id UUID,
  tenant_uuid UUID,
  user_role TEXT,
  user_email TEXT,
  user_name TEXT
)
RETURNS UUID AS $$
DECLARE
  created_user_id UUID;
BEGIN
  -- Validate role
  IF user_role NOT IN ('brand_admin', 'brand_user') THEN
    RAISE EXCEPTION 'Invalid user_role. Must be: brand_admin or brand_user';
  END IF;

  -- Verify tenant exists
  IF NOT EXISTS (SELECT 1 FROM tenants WHERE id = tenant_uuid) THEN
    RAISE EXCEPTION 'Tenant with ID % does not exist.', tenant_uuid;
  END IF;

  -- Verify the auth user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = auth_user_id) THEN
    RAISE EXCEPTION 'Auth user with ID % does not exist. Create user in Supabase Auth first.', auth_user_id;
  END IF;

  -- Verify user doesn't already exist
  IF EXISTS (SELECT 1 FROM users WHERE id = auth_user_id) THEN
    RAISE EXCEPTION 'User already exists in users table.';
  END IF;

  -- Create user
  INSERT INTO users (id, tenant_id, role, email, full_name)
  VALUES (auth_user_id, tenant_uuid, user_role, user_email, user_name)
  RETURNING id INTO created_user_id;

  RAISE NOTICE 'User added to tenant: % (Role: %)', user_name, user_role;

  RETURN created_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- BOOTSTRAP FUNCTION 4: Handle Signup with Invite
-- =====================================================
-- This function handles user signup when they have a pending invite

CREATE OR REPLACE FUNCTION bootstrap_accept_invite_and_create_user(
  auth_user_id UUID,
  invite_email TEXT,
  user_name TEXT
)
RETURNS TABLE(user_id UUID, tenant_id UUID, role TEXT) AS $$
DECLARE
  invite_record RECORD;
  created_user_id UUID;
BEGIN
  -- Find pending invite for this email
  SELECT * INTO invite_record
  FROM team_invites
  WHERE email = invite_email
    AND status = 'pending'
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'No valid invite found for email: %', invite_email;
  END IF;

  -- Verify the auth user exists
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = auth_user_id) THEN
    RAISE EXCEPTION 'Auth user with ID % does not exist.', auth_user_id;
  END IF;

  -- Verify user doesn't already exist
  IF EXISTS (SELECT 1 FROM users WHERE id = auth_user_id) THEN
    RAISE EXCEPTION 'User already exists in users table.';
  END IF;

  -- Create user with invited role
  INSERT INTO users (id, tenant_id, role, email, full_name)
  VALUES (
    auth_user_id,
    invite_record.tenant_id,
    invite_record.role,
    invite_email,
    user_name
  )
  RETURNING id INTO created_user_id;

  -- Mark invite as accepted
  UPDATE team_invites
  SET status = 'accepted'
  WHERE id = invite_record.id;

  RAISE NOTICE 'User created from invite: % (Tenant: %, Role: %)', 
    user_name, invite_record.tenant_id, invite_record.role;

  RETURN QUERY 
    SELECT created_user_id, invite_record.tenant_id, invite_record.role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- BOOTSTRAP FUNCTION 5: Automated Post-Signup Handler
-- =====================================================
-- This function can be triggered automatically after Supabase Auth signup
-- It checks for invites or creates a new tenant for the user

CREATE OR REPLACE FUNCTION handle_new_user_signup()
RETURNS TRIGGER AS $$
DECLARE
  user_email TEXT;
  invite_record RECORD;
BEGIN
  -- Get the email from the new auth user
  user_email := NEW.email;

  -- Check if there's a pending invite for this email
  SELECT * INTO invite_record
  FROM team_invites
  WHERE email = user_email
    AND status = 'pending'
    AND expires_at > now()
  ORDER BY created_at DESC
  LIMIT 1;

  IF FOUND THEN
    -- User has an invite - create them in the invited tenant
    INSERT INTO users (id, tenant_id, role, email, full_name)
    VALUES (
      NEW.id,
      invite_record.tenant_id,
      invite_record.role,
      user_email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', user_email)
    );

    -- Mark invite as accepted
    UPDATE team_invites
    SET status = 'accepted'
    WHERE id = invite_record.id;

    RAISE NOTICE 'New user % added to tenant via invite', user_email;
  ELSE
    -- No invite - this could be a new brand signup
    -- For now, we'll just log it and require manual tenant creation
    -- In production, you might create a tenant automatically here
    RAISE NOTICE 'New user % signed up without invite - requires tenant assignment', user_email;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- TRIGGER: Automatic User Creation on Auth Signup
-- =====================================================
-- This trigger automatically handles user creation when someone signs up
-- OPTIONAL: Comment this out if you want manual control over user creation

-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW
--   EXECUTE FUNCTION handle_new_user_signup();

-- NOTE: The above trigger is commented out by default for security.
-- Enable it only if you want automatic user provisioning.
-- For production, it's recommended to handle this via a controlled flow.

-- =====================================================
-- BOOTSTRAP FUNCTION 6: Expire Old Invites
-- =====================================================
-- This function marks expired invites as expired
-- Run this periodically via a cron job

CREATE OR REPLACE FUNCTION cleanup_expired_invites()
RETURNS INTEGER AS $$
DECLARE
  expired_count INTEGER;
BEGIN
  UPDATE team_invites
  SET status = 'expired'
  WHERE status = 'pending'
    AND expires_at < now();

  GET DIAGNOSTICS expired_count = ROW_COUNT;
  
  RAISE NOTICE 'Marked % invites as expired', expired_count;
  
  RETURN expired_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- BOOTSTRAP HELPER: Check User Role
-- =====================================================
-- Quick function to check a user's current role and tenant

CREATE OR REPLACE FUNCTION get_user_info(user_uuid UUID)
RETURNS TABLE(
  user_id UUID,
  email TEXT,
  role TEXT,
  tenant_id UUID,
  tenant_name TEXT,
  is_active BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.email,
    u.role,
    u.tenant_id,
    t.brand_name,
    COALESCE(t.active, true) as is_active
  FROM users u
  LEFT JOIN tenants t ON u.tenant_id = t.id
  WHERE u.id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- EXAMPLE BOOTSTRAP USAGE
-- =====================================================

/*
-- Step 1: Create your first user in Supabase Auth Dashboard
-- Then run this to make them a super admin:

SELECT bootstrap_create_super_admin(
  '[your-auth-user-id-from-auth.users]'::UUID,
  'admin@comify.ai',
  'Comify Admin'
);

-- Step 2: Create a test tenant with a brand admin:
-- First create the auth user in Supabase Auth, then:

SELECT * FROM bootstrap_create_tenant_with_admin(
  '[auth-user-id]'::UUID,
  'Test Fashion Brand',
  'admin@testbrand.com',
  'Test Admin',
  'professional'
);

-- Step 3: Add additional users to existing tenant:

SELECT bootstrap_add_user_to_tenant(
  '[auth-user-id]'::UUID,
  '[tenant-id]'::UUID,
  'brand_user',
  'user@testbrand.com',
  'Test User'
);

-- Step 4: Check user info:

SELECT * FROM get_user_info('[user-id]'::UUID);

-- Step 5: Cleanup expired invites (run periodically):

SELECT cleanup_expired_invites();
*/

-- =====================================================
-- SECURITY NOTES
-- =====================================================

COMMENT ON FUNCTION bootstrap_create_super_admin IS 
  'Creates the first super admin. Should only be called once during initial setup.';

COMMENT ON FUNCTION bootstrap_create_tenant_with_admin IS 
  'Creates a new tenant and its first brand admin. Used for onboarding new brands.';

COMMENT ON FUNCTION bootstrap_add_user_to_tenant IS 
  'Adds a user to an existing tenant with specified role.';

COMMENT ON FUNCTION bootstrap_accept_invite_and_create_user IS 
  'Creates a user account from a pending team invite.';

COMMENT ON FUNCTION handle_new_user_signup IS 
  'Automatic handler for new auth signups (optional trigger).';

COMMENT ON FUNCTION cleanup_expired_invites IS 
  'Marks expired invites as expired. Run via cron job.';

COMMENT ON FUNCTION get_user_info IS 
  'Helper function to retrieve user information including tenant details.';

-- =====================================================
-- END OF BOOTSTRAP FLOW
-- =====================================================
