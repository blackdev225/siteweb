import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertMessageSchema } from "@shared/schema";
import rateLimit from "express-rate-limit";

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 requests per 15 mins
  message: { message: "Too many contact requests, please try again later" }
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // === Projects ===
  
  app.get(api.projects.list.path, async (req, res) => {
    try {
      // Manual query param parsing since express query params are strings
      const params = {
        category: req.query.category as string | undefined,
        type: req.query.type as string | undefined,
        isFeatured: req.query.isFeatured === 'true' ? true : req.query.isFeatured === 'false' ? false : undefined
      };
      
      const projects = await storage.getProjects(params);
      res.json(projects);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.projects.get.path, async (req, res) => {
    try {
      const project = await storage.getProject(Number(req.params.id));
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // === Contact ===

  app.post(api.contact.submit.path, contactLimiter, async (req, res) => {
    try {
      // Honeypot check
      if (req.body.website) {
        return res.status(400).json({ message: "Bot detected" });
      }

      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}

// Seed function to populate initial data
export async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    console.log("Seeding database...");
    
    const projectsToSeed = [
      {
        title: "Ministère de la Défense",
        subtitle: "R-chitects26",
        category: "featured",
        type: "exterior",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
        description: "A monumental government project focusing on security, durability, and modern architectural authority."
      },
      {
        title: "Villa RIV2",
        subtitle: "AOCARRE/IDBYM",
        category: "featured",
        type: "exterior",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1600596542815-2a4d9f8756d6?auto=format&fit=crop&q=80&w=2000",
        description: "Luxury residential villa blending tropical modernism with high-end materials."
      },
      {
        title: "Immeuble Zephyre",
        subtitle: "R-chitects26",
        category: "featured",
        type: "exterior",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000",
        description: "Mixed-use high-rise development emphasizing sustainable living and wind flow design."
      },
      {
        title: "Villa Lagune",
        subtitle: "R-chitects26",
        category: "featured",
        type: "exterior",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000",
        description: "Waterfront property designed to maximize lagoon views and natural ventilation."
      },
      {
        title: "Parisha Building",
        subtitle: "R-chitects26",
        category: "featured",
        type: "exterior",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1554435493-93422e8220c8?auto=format&fit=crop&q=80&w=2000",
        description: "Corporate headquarters with a striking geometric façade and innovative workspace solutions."
      },
      {
        title: "MTN Korhogo Agency",
        subtitle: "Ligne D Architectes",
        category: "featured",
        type: "exterior",
        isFeatured: true,
        imageUrl: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&q=80&w=2000",
        description: "Telecommunications agency branch focusing on accessibility and brand identity integration."
      },
      // Interactive / VR projects
      {
        title: "Villa Lagune VR Walkthrough",
        subtitle: "R-chitects26",
        category: "interactive",
        type: "vr",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?auto=format&fit=crop&q=80&w=2000",
        description: "Immersive VR tour of the Villa Lagune project allowing clients to experience the space before construction."
      },
      {
        title: "Parisha Building 360° Tour",
        subtitle: "R-chitects26",
        category: "interactive",
        type: "vr",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=2000",
        description: "Complete 360-degree interactive tour of the Parisha Building interior and exterior."
      },
      {
        title: "Ministère Interior VR Experience",
        subtitle: "R-chitects26",
        category: "interactive",
        type: "vr",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000",
        description: "High-fidelity interior visualization and VR walkthrough of key government offices."
      },
      // Gallery Items (Mix)
      {
        title: "Modern Interior Study",
        subtitle: "Concept",
        category: "gallery",
        type: "interior",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000",
        description: "Photorealistic lighting study for a modern living room."
      },
       {
        title: "Urban Facade Detail",
        subtitle: "Concept",
        category: "gallery",
        type: "exterior",
        isFeatured: false,
        imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=2000",
        description: "Detailed close-up of architectural materials and textures."
      }
    ];

    for (const project of projectsToSeed) {
      await storage.createProject(project);
    }
    console.log("Database seeded successfully!");
  }
}
