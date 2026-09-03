import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const brandReferences = pgTable("brand_references", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url").notNull(),
  website: text("website"),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export type BrandReference = typeof brandReferences.$inferSelect;
export type NewBrandReference = typeof brandReferences.$inferInsert;
