// Shared TypeScript types for Vitti Builders

export type ProjectType = "apartment" | "land" | "commercial";
export type ProjectStatus = "ongoing" | "upcoming" | "completed";
export type ContactType = "contact" | "jv_proposal";

export interface Project {
  id: string;
  title_en: string;
  title_bn: string;
  location_en: string;
  location_bn: string;
  type: ProjectType;
  status: ProjectStatus;
  size_en: string;
  size_bn: string;
  price_en: string;
  price_bn: string;
  image_url: string;
  features_en: string[];
  features_bn: string[];
  is_published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  project_id: string | null;
  project_name: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Contact {
  id: string;
  type: ContactType;
  name: string;
  phone: string;
  email: string;
  // contact form
  interest: string;
  message: string;
  // JV proposal
  land_location: string;
  land_size: string;
  road_width: string;
  notes: string;
  is_read: boolean;
  created_at: string;
}

// Form input types (no id/timestamps)
export type CreateProjectInput = Omit<Project, "id" | "created_at" | "updated_at">;
export type CreateInquiryInput = Omit<Inquiry, "id" | "is_read" | "created_at">;
export type CreateContactInput = Omit<Contact, "id" | "is_read" | "created_at">;
