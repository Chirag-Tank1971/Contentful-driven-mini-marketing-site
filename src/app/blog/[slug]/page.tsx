import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/contentful/blog";
import { Badge } from "@/components/ui/badge";
import { RichText } from "@/components/rich-text";

type PageParams = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: "Post not found | Intern Marketing Blog",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Intern Marketing Blog`,
    description: post.excerpt || "Blog post on the Intern Marketing Blog.",
  };
}

export default async function BlogPostPage({ params }: PageParams) {
  const resolvedParams = await Promise.resolve(params);
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <header className="space-y-3">
        <Badge>
          {new Date(post.publishedDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </Badge>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>
        )}
      </header>

      {post.coverImageUrl && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      <section>
        <RichText document={post.content} />
      </section>
    </article>
  );
}


