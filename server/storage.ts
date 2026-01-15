import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import {
  projects,
  messages,
  type Project,
  type InsertProject,
  type Message,
  type InsertMessage,
  type ProjectsQueryParams
} from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(params?: ProjectsQueryParams): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(params?: ProjectsQueryParams): Promise<Project[]> {
    let query = db.select().from(projects).$dynamic();
    
    if (params) {
      if (params.category) {
        query = query.where(eq(projects.category, params.category));
      }
      if (params.type) {
        query = query.where(eq(projects.type, params.type));
      }
      if (params.isFeatured !== undefined) {
        query = query.where(eq(projects.isFeatured, params.isFeatured));
      }
    }
    
    return await query.orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();
