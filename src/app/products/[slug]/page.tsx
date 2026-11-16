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

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:mb-8 sm:text-sm">
          <a href="/" className="hover:text-accent">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-accent">Products</a>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <ProductDetailClient product={product} />

        {/* Features grid */}
        <section className="mt-12 sm:mt-16 lg:mt-24">
          <h2 className="text-center text-xl font-semibold text-foreground sm:text-2xl">
            Engineered for clinical excellence
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {product.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-border bg-white p-4 sm:p-6"
              >
                <h3 className="text-sm font-semibold text-foreground sm:text-base">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Specifications */}
        <section className="mt-12 sm:mt-16 lg:mt-24">
          <h2 className="mb-6 text-center text-xl font-semibold text-foreground sm:mb-8 sm:text-2xl">
            Technical specifications
          </h2>
          <div className="mx-auto max-w-3xl">
            <SpecTable specs={product.specs} />
          </div>
        </section>

        {/* Related inquiry CTA */}
        <section className="mt-12 rounded-2xl bg-foreground p-6 text-center text-white sm:mt-16 sm:p-8 lg:mt-24 lg:p-12">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Ready to equip your clinic?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs text-white/70 sm:text-sm">
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
