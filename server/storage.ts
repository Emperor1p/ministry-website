import { db } from "./db";
import {
  inquiries, faqs, galleryItems,
  type InsertInquiry, type Inquiry,
  type Faq, type InsertFaq,
  type GalleryItem, type InsertGalleryItem
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // FAQs
  getFaqs(): Promise<Faq[]>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  
  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async getFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs).orderBy(faqs.order);
  }

  async createFaq(insertFaq: InsertFaq): Promise<Faq> {
    const [faq] = await db
      .insert(faqs)
      .values(insertFaq)
      .returning();
    return faq;
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems);
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const [item] = await db
      .insert(galleryItems)
      .values(insertItem)
      .returning();
    return item;
  }
}

export const storage = new DatabaseStorage();
