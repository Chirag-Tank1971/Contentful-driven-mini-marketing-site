import Link from "next/link";
import { getPosts } from "@/lib/contentful/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60;

export default async function Home() {
  const posts = await getPosts();
  const latest = posts.slice(0, 3);

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-4 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 px-8 py-10 text-zinc-50 shadow-md">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Contentful-powered marketing blog for your next launch.
        </h1>
        <p className="max-w-2xl text-sm text-zinc-200 sm:text-base">
          Manage content in Contentful, ship with Next.js App Router, and keep
          everything production-ready with typed APIs and incremental
          static regeneration.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/blog">Read the blog</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Latest updates</Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Latest posts
          </h2>
          <Link
            href="/blog"
            className="text-sm font-medium text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            View all
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No posts published yet. Add a few entries in Contentful to see them
            here.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-3">
            {latest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
                  <CardHeader>
                    <Badge className="mb-2">
                      {new Date(post.publishedDate).toLocaleDateString()}
                    </Badge>
                    <CardTitle className="line-clamp-2">
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
        )}
      </section>
    </div>
  );
}

