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
  res.json(rows);
});

export default router;
