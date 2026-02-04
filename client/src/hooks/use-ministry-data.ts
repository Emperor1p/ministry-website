import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertInquiry, type InsertFaq, type InsertGalleryItem } from "@shared/routes";

// ============================================
// FAQS
// ============================================
export function useFaqs() {
  return useQuery({
    queryKey: [api.faqs.list.path],
    queryFn: async () => {
      const res = await fetch(api.faqs.list.path);
      if (!res.ok) throw new Error("Failed to fetch FAQs");
      return api.faqs.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// GALLERY
// ============================================
export function useGallery() {
  return useQuery({
    queryKey: [api.gallery.list.path],
    queryFn: async () => {
      const res = await fetch(api.gallery.list.path);
      if (!res.ok) throw new Error("Failed to fetch gallery items");
      return api.gallery.list.responses[200].parse(await res.json());
    },
  });
}

// ============================================
// INQUIRIES (CONTACT FORM)
// ============================================
export function useCreateInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const validated = api.inquiries.create.input.parse(data);
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.inquiries.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit inquiry");
      }
      return api.inquiries.create.responses[201].parse(await res.json());
    },
    // No need to invalidate queries as this is write-only for the public interface
  });
}
