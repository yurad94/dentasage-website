import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  blogPosts,
  getPostBySlug,
  getAllPostSlugs,
} from "@/lib/data/blog";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: "Article not found" };
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.date,
      },
      alternates: { canonical: `/blog/${post.slug}` },
    };
  })();
}

function renderMarkdown(content: string) {
  // Lightweight markdown renderer for headings and paragraphs
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={i}
          className="mt-10 text-xl font-semibold text-foreground"
        >
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      // Collect list items
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      i--; // backtrack since loop will increment
      elements.push(
        <ul key={`list-${i}`} className="mt-4 space-y-2">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="flex gap-2 text-base text-muted-foreground"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      elements.push(
        <p
          key={i}
          className="mt-4 text-base leading-relaxed text-muted-foreground"
        >
          {renderInline(line)}
        </p>
      );
    }
    i++;
  }
  return elements;
}

function renderInline(text: string): React.ReactNode {
  // Handle **bold** segments
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "DENTASAGE" },
    publisher: { "@type": "Organization", name: "DENTASAGE" },
  };

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog" className="hover:text-accent">
            Journal
          </Link>
          <span>/</span>
          <span className="text-foreground">{post.category}</span>
        </nav>

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

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="mt-10">{renderMarkdown(post.content)}</div>

        <div className="mt-16 border-t border-border pt-8">
          <h2 className="text-lg font-semibold text-foreground">
            Continue reading
          </h2>
          <div className="mt-4 space-y-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="block rounded-xl border border-border p-5 transition-colors hover:bg-muted"
              >
                <p className="text-xs text-muted-foreground">{r.category}</p>
                <p className="mt-1 font-medium text-foreground">{r.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
