import Link from "next/link";
import type { Metadata } from "next";
import { getPosts } from "@/lib/contentful/blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | Intern Marketing Blog",
  description: "Contentful-powered blog listing all marketing articles.",
};

export default async function BlogPage({
  searchParams,
}: {searchParams?: { query?: string }}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const posts = await getPosts(resolvedSearchParams?.query);

  if (posts.length === 0) {
    return (
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Blog
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          No posts are published yet. Create and publish some BlogPost entries
          in Contentful to see them here.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Blog
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Long-form updates, product learnings, and content managed entirely in
          Contentful.
        </p>
        <form className="flex items-center gap-2">
          <input
            type="text"
            name="query"
            placeholder="Search posts..."
            className="flex-1 rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            defaultValue={resolvedSearchParams?.query || ''}
          />
          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </form>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <Badge>
                  {new Date(post.publishedDate).toLocaleDateString()}
                </Badge>
                <CardTitle className="mt-2 line-clamp-2">
                  {post.title}
                </CardTitle>
                {post.excerpt && (
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Read post →
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}


