import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  brand: text("brand"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewContactSubmission = typeof contactSubmissions.$inferInsert;
