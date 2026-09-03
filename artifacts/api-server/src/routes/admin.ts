import { Router } from "express";
import { db } from "@workspace/db";
import { seoMeta, brandReferences, contactSubmissions } from "@workspace/db/schema";
import { eq, asc, desc } from "drizzle-orm";

const router = Router();

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin123!";
const EXPECTED_AUTH =
  "Basic " + Buffer.from(`${ADMIN_USER}:${ADMIN_PASS}`).toString("base64");

function requireAuth(req: any, res: any, next: any) {
  const auth = req.headers.authorization;
  if (auth !== EXPECTED_AUTH) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Apply auth to all admin routes
router.use(requireAuth);

// ===== SEO META =====
router.get("/seo", async (_req, res) => {
  const rows = await db.select().from(seoMeta);
  return res.json(rows);
});

router.get("/seo/:slug", async (req, res) => {
  const rows = await db.select().from(seoMeta).where(eq(seoMeta.pageSlug, req.params.slug));
  if (rows.length === 0) return res.status(404).json({ error: "Not found" });
  return res.json(rows[0]);
});

router.post("/seo", async (req, res) => {
  const { pageSlug, title, description, keywords } = req.body;
  if (!pageSlug || !title || !description) {
    return res.status(400).json({ error: "pageSlug, title, description required" });
  }
  const inserted = await db
    .insert(seoMeta)
    .values({ pageSlug, title, description, keywords: keywords ?? "" })
    .onConflictDoUpdate({
      target: seoMeta.pageSlug,
      set: { title, description, keywords: keywords ?? "" },
    })
    .returning();
  return res.json(inserted[0]);
});

router.delete("/seo/:slug", async (req, res) => {
  await db.delete(seoMeta).where(eq(seoMeta.pageSlug, req.params.slug));
  return res.json({ ok: true });
});

// ===== BRAND REFERENCES =====
router.get("/brands", async (_req, res) => {
  const rows = await db.select().from(brandReferences).orderBy(brandReferences.sortOrder);
  return res.json(rows);
});

router.post("/brands", async (req, res) => {
  const { name, logoUrl, website, sortOrder } = req.body;
  if (!name || !logoUrl) {
    return res.status(400).json({ error: "name, logoUrl required" });
  }
  const inserted = await db
    .insert(brandReferences)
    .values({ name, logoUrl, website, sortOrder: sortOrder ?? 0 })
    .returning();
  return res.json(inserted[0]);
});

router.patch("/brands/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, logoUrl, website, sortOrder } = req.body;
  const updated = await db
    .update(brandReferences)
    .set({ name, logoUrl, website, sortOrder })
    .where(eq(brandReferences.id, id))
    .returning();
  if (updated.length === 0) return res.status(404).json({ error: "Not found" });
  return res.json(updated[0]);
});

router.delete("/brands/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(brandReferences).where(eq(brandReferences.id, id));
  return res.json({ ok: true });
});

// ===== ADMIN CONTACT SUBMISSIONS =====
router.get("/contacts", async (_req, res) => {
  const rows = await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  return res.json(rows);
});

router.delete("/contacts/:id", async (req, res) => {
  const id = Number(req.params.id);
  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  return res.json({ ok: true });
});

export default router;
