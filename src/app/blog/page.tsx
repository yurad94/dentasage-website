import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Journal — Insights from DENTASAGE",
  description:
    "Engineering notes, clinical guides, and product insights from the DENTASAGE team. Learn what makes a precision dental mirror.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Journal
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Insights from the workshop
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Engineering notes, clinical guidance, and the thinking behind every
          DENTASAGE instrument.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {sorted.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-2xl border border-border bg-white p-8 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full bg-accent/10 px-2.5 py-1 font-medium text-accent">
                {post.category}
              </span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-3 text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <span className="mt-4 inline-flex text-sm font-medium text-accent">
              Read article →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
