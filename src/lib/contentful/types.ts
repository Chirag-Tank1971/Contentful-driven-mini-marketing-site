import type { Document } from "@contentful/rich-text-types";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: Document;
  coverImageUrl: string | null;
  publishedDate: string;
};


