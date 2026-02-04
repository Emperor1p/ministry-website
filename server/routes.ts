import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertInquirySchema } from "@shared/schema";

async function seedDatabase() {
  const existingFaqs = await storage.getFaqs();
  if (existingFaqs.length === 0) {
    await storage.createFaq({
      question: "What does the ministry do?",
      answer: "We focus on supporting the aged and elderly through financial support, provision of essential goods, and healthcare assistance to ensure they live with dignity and comfort.",
      order: 1
    });
    await storage.createFaq({
      question: "How can I support the ministry?",
      answer: "You can support us through financial donations, volunteering your time, or donating essential items like food and clothing. Please verify our bank details in the Donation section.",
      order: 2
    });
    await storage.createFaq({
      question: "Who benefits from the ministry?",
      answer: "Our primary beneficiaries are elderly individuals who lack adequate support systems, financial means, or family care. We strive to reach the most vulnerable in our community.",
      order: 3
    });
  }

  const existingGallery = await storage.getGalleryItems();
  if (existingGallery.length === 0) {
    // Adding some initial placeholders
    await storage.createGalleryItem({
      title: "Community Outreach",
      imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80",
      category: "outreach"
    });
    await storage.createGalleryItem({
      title: "Healthcare Support",
      imageUrl: "https://images.unsplash.com/photo-1584515933487-9bfa95f5370f?auto=format&fit=crop&q=80",
      category: "activity"
    });
    await storage.createGalleryItem({
      title: "Food Distribution",
      imageUrl: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80",
      category: "activity"
    });
    await storage.createGalleryItem({
      title: "Ministry Gathering",
      imageUrl: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80",
      category: "founder"
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  seedDatabase().catch(console.error);

  // Inquiries
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // FAQs
  app.get(api.faqs.list.path, async (_req, res) => {
    const faqs = await storage.getFaqs();
    res.json(faqs);
  });

  // Gallery
  app.get(api.gallery.list.path, async (_req, res) => {
    const items = await storage.getGalleryItems();
    res.json(items);
  });

  return httpServer;
}
