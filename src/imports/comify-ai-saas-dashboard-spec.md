You are building a production-ready SaaS dashboard for Comify AI — an AI-powered virtual try-on platform for fashion brands.

This is not a prototype.
This must be structured as a scalable, secure, multi-tenant B2B SaaS dashboard.

The UI must integrate with Supabase (Postgres + Auth + Storage) as backend.

You must design:
	1.	Brand-facing client dashboard
	2.	System-level admin panel
	3.	Role-based authentication
	4.	Multi-tenant data isolation
	5.	Secure API key management
	6.	Job monitoring interface
	7.	Garment onboarding workflow
	8.	Usage analytics panel

Design must be modern, minimal, professional, and investor-ready.

⸻

SYSTEM ARCHITECTURE RULES
	•	All authentication handled by Supabase Auth
	•	Use role-based access control (RBAC)
	•	Enforce multi-tenant separation via Supabase Row-Level Security (RLS)
	•	No sensitive business logic implemented purely client-side
	•	All VTO engine requests are sent to external backend API (FastAPI) via secure server-side calls
	•	Do NOT store API keys in frontend code
	•	Do NOT expose internal system endpoints in UI

⸻

USER ROLES

Define 3 roles:
	1.	Super Admin (Comify internal)
	2.	Brand Admin (fashion brand owner)
	3.	Brand User (brand staff member)

Enforce:
	•	Brand users can only access their own tenant data
	•	Brand admins can manage team members
	•	Super admin can view all tenants

⸻

DATABASE STRUCTURE (Supabase)

Create the following tables:
	1.	tenants

	•	id (uuid)
	•	brand_name
	•	plan_type
	•	created_at

	2.	users

	•	id (uuid)
	•	tenant_id (foreign key)
	•	role (enum: super_admin, brand_admin, brand_user)
	•	email
	•	created_at

	3.	garments

	•	id (uuid)
	•	tenant_id
	•	name
	•	category (top, dress, outerwear, etc.)
	•	image_url
	•	status (active, archived)
	•	created_at

	4.	try_on_jobs

	•	id (uuid)
	•	tenant_id
	•	garment_id
	•	user_photo_url
	•	result_image_url
	•	status (pending, processing, completed, failed)
	•	failure_reason
	•	latency_ms
	•	created_at

	5.	api_keys

	•	id (uuid)
	•	tenant_id
	•	key_hash (never store raw key)
	•	created_at
	•	last_used_at
	•	active (boolean)

	6.	usage_logs

	•	id
	•	tenant_id
	•	job_id
	•	inference_cost_estimate
	•	timestamp

Enable strict RLS so:
	•	Users only access rows where tenant_id matches their own
	•	Super admin can bypass RLS

⸻

BRAND DASHBOARD FEATURES

Create a clean sidebar layout with:

Dashboard Overview
Garments
Try-On Jobs
API Keys
Team Members
Usage & Analytics
Settings

⸻

1. Dashboard Overview Page

Display:
	•	Total try-ons this month
	•	Success rate
	•	Avg latency
	•	Active garments
	•	Recent activity table

⸻

2. Garment Management Page

Features:
	•	Upload garment image
	•	Select category
	•	Preview uploaded image
	•	Edit garment name
	•	Archive garment
	•	Pagination
	•	Search filter

Use Supabase Storage for image upload.

⸻

3. Try-On Jobs Page

Display table:
	•	Job ID
	•	Garment
	•	Status
	•	Latency
	•	Created at
	•	View result button
	•	Error reason if failed

Auto-refresh every 5 seconds for active jobs.

⸻

4. API Key Management Page

Features:
	•	Generate new API key
	•	Display masked key once
	•	Copy button
	•	Revoke key
	•	View last usage timestamp

Important:
Only show full key once during generation.
Store hashed version in DB.

⸻

5. Team Management Page

Brand Admin can:
	•	Invite user via email
	•	Assign role
	•	Remove user

Brand User cannot manage roles.

⸻

6. Usage & Analytics Page

Charts:
	•	Try-ons per day (30-day chart)
	•	Success vs failure ratio
	•	Average latency trend
	•	Estimated cost usage

⸻

ADMIN PANEL (Super Admin Only)

Separate route: /admin

Features:
	1.	Tenant List

	•	View all brands
	•	View plan
	•	View usage
	•	Disable tenant

	2.	Global Job Monitor

	•	View all try-on jobs
	•	Filter by tenant
	•	Retry failed job
	•	View error logs

	3.	System Health

	•	Total active jobs
	•	Failed jobs in last 24h
	•	Queue length (mocked for now)
	•	GPU health status placeholder

	4.	Billing Overview (basic)

	•	Usage per tenant
	•	Plan type
	•	Estimated monthly inference cost

⸻

SECURITY REQUIREMENTS
	•	All API calls authenticated via Supabase JWT
	•	API key validation performed server-side
	•	No direct database writes from client without RLS
	•	Admin routes protected via role check middleware
	•	No exposure of raw backend service URLs

⸻

UI DESIGN SPEC
	•	Clean SaaS style (similar to Stripe / Vercel dashboard)
	•	Minimalist
	•	Dark + Light mode toggle
	•	Responsive
	•	Clear typography
	•	Subtle animations
	•	Professional tone

⸻

INTEGRATION WITH VTO ENGINE

Create API integration layer:

Endpoint example:
POST /api/v1/try-on

Payload:
	•	tenant_id
	•	garment_id
	•	user_photo_url
	•	api_key

Display:
	•	Pending state
	•	Processing animation
	•	Final result
	•	Error state with reason

⸻

NON-GOALS

Do NOT:
	•	Implement diffusion models
	•	Implement GPU logic
	•	Simulate heavy backend logic
	•	Store secrets client-side
	•	Hardcode tenant data

⸻

FINAL OUTPUT REQUIREMENTS

Deliver:
	•	Fully navigable dashboard
	•	Working Supabase integration
	•	Role-based auth
	•	Multi-tenant RLS configuration
	•	Secure API key flow
	•	Clean database schema
	•	Production-ready component structure
	•	Clean folder organization
	•	Deployment-ready configuration

⸻

Now generate the complete UI and backend integration structure accordingly.
