import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle"), // Client or Architect name
  category: text("category").notNull(), // 'featured', 'gallery', 'interactive'
  type: text("type").notNull(), // 'exterior', 'interior', 'animation', 'vr'
  imageUrl: text("image_url").notNull(),
  videoUrl: text("video_url"),
  description: text("description"),
  isFeatured: boolean("is_featured").default(false),
  tags: text("tags").array(), // For additional filtering if needed
  createdAt: timestamp("created_at").defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });

// === EXPLICIT TYPES ===

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type CreateMessageRequest = InsertMessage;

// Response types
export type ProjectResponse = Project;
export type ProjectsListResponse = Project[];
export type MessageResponse = Message;

// Query params
export interface ProjectsQueryParams {
  category?: string; // 'featured', 'gallery', 'interactive'
  type?: string;     // 'exterior', 'interior', 'animation'
  isFeatured?: boolean;
}
