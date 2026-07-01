import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use('*', logger(console.log));
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check
app.get("/make-server-44fc6238/health", (c) => {
  return c.json({ status: "ok" });
});

// ── Templates ─────────────────────────────────────────────────────────────

app.get("/make-server-44fc6238/templates", async (c) => {
  const templates = await kv.get("alana:templates");
  return c.json(templates ?? []);
});

app.post("/make-server-44fc6238/templates/seed", async (c) => {
  const existing = await kv.get("alana:templates");
  if (existing && Array.isArray(existing) && existing.length > 0) {
    return c.json({ seeded: false, count: existing.length });
  }
  const templates = await c.req.json();
  await kv.set("alana:templates", templates);
  return c.json({ seeded: true, count: templates.length });
});

app.put("/make-server-44fc6238/templates/:id", async (c) => {
  const id = c.req.param("id");
  const updates = await c.req.json();
  const templates: any[] = (await kv.get("alana:templates")) ?? [];
  const idx = templates.findIndex((t: any) => t.id === id);
  if (idx === -1) return c.json({ error: "Template not found" }, 404);
  templates[idx] = { ...templates[idx], ...updates };
  await kv.set("alana:templates", templates);
  return c.json(templates[idx]);
});

app.post("/make-server-44fc6238/templates", async (c) => {
  const template = await c.req.json();
  const templates: any[] = (await kv.get("alana:templates")) ?? [];
  if (templates.find((t: any) => t.id === template.id)) {
    return c.json({ error: "Template with this id already exists" }, 409);
  }
  templates.push(template);
  await kv.set("alana:templates", templates);
  return c.json(template, 201);
});

app.delete("/make-server-44fc6238/templates/:id", async (c) => {
  const id = c.req.param("id");
  const templates: any[] = (await kv.get("alana:templates")) ?? [];
  const filtered = templates.filter((t: any) => t.id !== id);
  if (filtered.length === templates.length) {
    return c.json({ error: "Template not found" }, 404);
  }
  await kv.set("alana:templates", filtered);
  return c.json({ deleted: true });
});

// ── Submissions ───────────────────────────────────────────────────────────

// GET all submissions (Guardian Panel + Analytics)
app.get("/make-server-44fc6238/submissions", async (c) => {
  const submissions = await kv.getByPrefix("alana:submission:");
  return c.json(submissions ?? []);
});

// GET submissions for a specific wallet address
app.get("/make-server-44fc6238/submissions/user/:address", async (c) => {
  const address = c.req.param("address").toLowerCase();
  const all: any[] = (await kv.getByPrefix("alana:submission:")) ?? [];
  const userSubs = all.filter((s: any) => s.userAddress?.toLowerCase() === address);
  return c.json(userSubs);
});

// POST create a new submission
app.post("/make-server-44fc6238/submissions", async (c) => {
  const submission = await c.req.json();
  if (!submission.id) return c.json({ error: "Submission must have an id" }, 400);
  await kv.set(`alana:submission:${submission.id}`, submission);
  return c.json(submission, 201);
});

// PUT update a submission (draft edit, review, status change)
app.put("/make-server-44fc6238/submissions/:id", async (c) => {
  const id = c.req.param("id");
  const updates = await c.req.json();
  const existing = await kv.get(`alana:submission:${id}`);
  if (!existing) return c.json({ error: "Submission not found" }, 404);
  const updated = { ...existing, ...updates };
  await kv.set(`alana:submission:${id}`, updated);
  return c.json(updated);
});

// DELETE a submission
app.delete("/make-server-44fc6238/submissions/:id", async (c) => {
  const id = c.req.param("id");
  await kv.del(`alana:submission:${id}`);
  return c.json({ deleted: true });
});

Deno.serve(app.fetch);
