import type { Document } from "@contentful/rich-text-types";
import { ContentfulNotFoundError, contentfulFetch } from "./client";
import type { BlogPost } from "./types";

type Sys = {
  id: string;
};

type AssetFields = {
  file: {
    url: string;
  };
};

type BlogPostFields = {
  title: string;
  slug: string;
  excerpt?: string;
  content: Document;
  coverImage?: {
    sys: {
      id: string;
    };
  };
  publishedDate: string;
};

type Entry<TFields> = {
  sys: Sys;
  fields: TFields;
};

type Collection<TEntry> = {
  items: TEntry[];
  includes?: {
    Asset?: Array<Entry<AssetFields>>;
  };
};

function resolveAssetUrl(
  assetId: string | undefined,
  assets: Array<Entry<AssetFields>>,
): string | null {
  if (!assetId) {
    return null;
  }

  const asset = assets.find((item) => item.sys.id === assetId);

  if (!asset) {
    return null;
  }

  const url = asset.fields.file.url;

  if (!url) {
    return null;
  }

  return url.startsWith("//") ? `https:${url}` : url;
}

function mapToBlogPost(
  entry: Entry<BlogPostFields>,
  assets: Array<Entry<AssetFields>>,
): BlogPost {
  const coverImageId = entry.fields.coverImage?.sys.id;
  const coverImageUrl = resolveAssetUrl(coverImageId, assets);

  return {
    id: entry.sys.id,
    title: entry.fields.title,
    slug: entry.fields.slug,
    excerpt: entry.fields.excerpt ?? "",
    content: entry.fields.content,
    coverImageUrl,
    publishedDate: entry.fields.publishedDate,
  };
}

export async function getPosts(query?: string): Promise<BlogPost[]> {
  try {
    const data = await contentfulFetch<Collection<Entry<BlogPostFields>>>(
      "entries",
      {
        searchParams: {
          content_type: "blogPost",
          order: "-fields.publishedDate",
          include: "1",
          ...(query ? { query } : {}),
        },
      },
    );

    const assets = data.includes?.Asset ?? [];

    return data.items.map((item) => mapToBlogPost(item, assets));
  } catch (error) {
    if (error instanceof ContentfulNotFoundError) {
      return [];
    }

    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const data = await contentfulFetch<Collection<Entry<BlogPostFields>>>(
      "entries",
      {
        searchParams: {
          content_type: "blogPost",
          "fields.slug": slug,
          limit: "1",
          include: "1",
        },
      },
    );

    if (data.items.length === 0) {
      return null;
    }

    const assets = data.includes?.Asset ?? [];

    return mapToBlogPost(data.items[0], assets);
  } catch (error) {
    if (error instanceof ContentfulNotFoundError) {
      return null;
    }

    throw error;
  }
}


