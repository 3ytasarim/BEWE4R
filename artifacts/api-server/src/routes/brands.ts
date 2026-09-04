import { Router } from "express";
import { db } from "@workspace/db";
import { brandReferences } from "@workspace/db/schema";
import { asc } from "drizzle-orm";

const router = Router();

// Public brands endpoint — no auth required
router.get("/brands", async (_req, res) => {
  const rows = await db
    .select()
    .from(brandReferences)
    .orderBy(asc(brandReferences.sortOrder));
  // Never let a CDN/proxy cache this (e.g. a stale empty list after seeding)
  res.set("Cache-Control", "no-store");
  res.json(rows);
});

export default router;
