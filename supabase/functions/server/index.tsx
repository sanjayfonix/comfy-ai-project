import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";
import dashboardApi from "./dashboard-api.tsx";
import adminApi from "./admin-api.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization", "X-Comify-API-Key"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Create storage buckets on startup
const bucketName = 'make-7c57d885-tryon-photos';
const garmentsBucket = 'make-7c57d885-garments';

const { data: buckets } = await supabase.storage.listBuckets();

if (!buckets?.some(bucket => bucket.name === bucketName)) {
  await supabase.storage.createBucket(bucketName, {
    public: false,
    fileSizeLimit: 5242880, // 5MB
  });
  console.log(`Created bucket: ${bucketName}`);
}

if (!buckets?.some(bucket => bucket.name === garmentsBucket)) {
  await supabase.storage.createBucket(garmentsBucket, {
    public: false,
    fileSizeLimit: 10485760, // 10MB
  });
  console.log(`Created bucket: ${garmentsBucket}`);
}

// Health check endpoint
app.get("/make-server-7c57d885/health", (c) => {
  return c.json({ status: "ok" });
});

// Mount dashboard API routes
app.route("/make-server-7c57d885/dashboard", dashboardApi);

// Mount admin API routes
app.route("/make-server-7c57d885/admin", adminApi);

Deno.serve(app.fetch);