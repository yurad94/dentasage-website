import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  products,
  getProductBySlug,
  getAllProductSlugs,
} from "@/lib/data/products";
import { SpecTable } from "@/components/product/SpecTable";
import { ProductDetailClient } from "@/components/product/ProductDetailClient";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return (async () => {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return { title: "Product not found" };

    return {
      title: `${product.name} — ${product.tagline}`,
      description: product.description.slice(0, 160),
      openGraph: {
        title: `${product.name} — ${product.tagline}`,
        description: product.description.slice(0, 160),
        images: [{ url: product.colors[0].mainImage }],
      },
      alternates: { canonical: `/products/${product.slug}` },
    };
  })();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "DENTASAGE" },
    category: "Dental Instrument",
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <a href="/" className="hover:text-accent">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-accent">Products</a>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <ProductDetailClient product={product} />

        {/* Features grid */}
        <section className="mt-24">
          <h2 className="text-center text-2xl font-semibold text-foreground">
            Engineered for clinical excellence
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-white p-6"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Specifications */}
        <section className="mt-24">
          <h2 className="mb-8 text-center text-2xl font-semibold text-foreground">
            Technical specifications
          </h2>
          <div className="mx-auto max-w-3xl">
            <SpecTable specs={product.specs} />
          </div>
        </section>

        {/* Related inquiry CTA */}
        <section className="mt-24 rounded-2xl bg-foreground p-8 text-center text-white sm:p-12">
          <h2 className="text-2xl font-semibold">
            Ready to equip your clinic?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/70">
            Bulk orders, multi-color sets, and OEM finishes available. Contact
            our team for pricing and lead times.
          </p>
          <a
            href="mailto:info@dentasage.com"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-foreground transition-opacity hover:opacity-90"
          >
            Request a quote
          </a>
        </section>
      </div>
    </>
  );
}
