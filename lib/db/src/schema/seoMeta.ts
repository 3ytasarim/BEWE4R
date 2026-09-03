import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const seoMeta = pgTable("seo_meta", {
  pageSlug: text("page_slug").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  keywords: text("keywords"),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export type SeoMeta = typeof seoMeta.$inferSelect;
export type NewSeoMeta = typeof seoMeta.$inferInsert;
