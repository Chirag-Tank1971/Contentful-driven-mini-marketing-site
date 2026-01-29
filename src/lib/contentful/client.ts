const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID ?? "master";
const CDA_TOKEN = process.env.CONTENTFUL_CDA_TOKEN;

if (!SPACE_ID || !CDA_TOKEN) {
  throw new Error("Contentful environment variables are not configured.");
}

// NOTE: Trailing slash is required so `new URL("entries", BASE_URL)` appends
// instead of replacing the last path segment (the environment id).
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}/`;

type FetchOptions = {
  searchParams?: Record<string, string>;
};

export class ContentfulNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContentfulNotFoundError";
  }
}

export async function contentfulFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const url = new URL(path, BASE_URL);

  if (options.searchParams) {
    Object.entries(options.searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${CDA_TOKEN}`,
    },
    ...(process.env.NODE_ENV === "development"
      ? { cache: "no-store" }
      : { next: { revalidate: 60 } }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new ContentfulNotFoundError(
        `Contentful resource not found (${url.toString()})`,
      );
    }

    throw new Error(`Contentful request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}


