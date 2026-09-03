import { Router } from "express";
import { db } from "@workspace/db";
import { contactSubmissions } from "@workspace/db/schema";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, brand, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, message required" });
  }
  const inserted = await db
    .insert(contactSubmissions)
    .values({ name, email, brand: brand ?? "", message })
    .returning();
  return res.json(inserted[0]);
});

export default router;
