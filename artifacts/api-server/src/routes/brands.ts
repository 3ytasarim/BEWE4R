import { Router } from "express";
import { db } from "@workspace/db";
import { brandReferences } from "@workspace/db/schema";
import { asc, eq, sql } from "drizzle-orm";

const router = Router();

// Full list including the logo data (used by the admin panel) — no auth required, never cached
router.get("/brands", async (_req, res) => {
  const rows = await db
    .select()
    .from(brandReferences)
    .orderBy(asc(brandReferences.sortOrder));
  // Never let a CDN/proxy cache this (e.g. a stale empty list after seeding)
  res.set("Cache-Control", "no-store");
  res.json(rows);
});

/**
 * Light list for the public website: logos are served by /brands/:id/logo (cacheable image files)
 * instead of being embedded as base64 in this JSON. The ?v= value changes whenever the brand is edited.
 */
router.get("/brands/public", async (_req, res) => {
  const rows = await db
    .select({
      id: brandReferences.id,
      name: brandReferences.name,
      website: brandReferences.website,
      sortOrder: brandReferences.sortOrder,
      updatedAt: brandReferences.updatedAt,
      isData: sql<boolean>`left(${brandReferences.logoUrl}, 5) = 'data:'`,
      externalUrl: sql<string | null>`case when left(${brandReferences.logoUrl}, 5) = 'data:' then null else ${brandReferences.logoUrl} end`,
    })
    .from(brandReferences)
    .orderBy(asc(brandReferences.sortOrder));

  res.set("Cache-Control", "no-store");
  res.json(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      website: r.website,
      sortOrder: r.sortOrder,
      logoUrl: r.isData ? `/api/brands/${r.id}/logo?v=${r.updatedAt ? r.updatedAt.getTime() : 0}` : r.externalUrl,
    })),
  );
});

router.get("/brands/:id/logo", async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(404).end();

  const [row] = await db
    .select({ logoUrl: brandReferences.logoUrl })
    .from(brandReferences)
    .where(eq(brandReferences.id, id))
    .limit(1);
  if (!row) return res.status(404).end();

  // Only raster images are served from stored data (never SVG, which could carry script)
  const match = /^data:(image\/(?:png|jpe?g|webp|gif|avif));base64,(.+)$/is.exec(row.logoUrl);
  if (!match) return row.logoUrl.startsWith("data:") ? res.status(404).end() : res.redirect(302, row.logoUrl);

  // The URL carries a version (?v=updatedAt), so a changed logo gets a new URL: cache it for a year.
  res.set({
    "Content-Type": match[1]!.toLowerCase(),
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'",
  });
  return res.send(Buffer.from(match[2]!, "base64"));
});

export default router;
