import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const product = products[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in-up">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                DENTASAGE · Sharp Series
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Capture
                <br />
                every detail.
              </h1>
              <p className="mt-6 max-w-md text-lg text-muted-foreground">
                Precision dental mirrors engineered for clarity, durability, and
                ergonomic comfort. 99% reflectance. 900+ sterilization cycles.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Explore the Sharp Mirror
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-full border border-border px-8 py-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  View all products
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in-up">
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-gradient-to-br from-white to-muted">
                <Image
                  src={product.colors[0].mainImage}
                  alt="DENTASAGE Sharp Mirror"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="border-y border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6">
            {product.highlights.map((h) => (
              <div
                key={h.label}
                className="bg-muted/50 px-4 py-8 text-center"
              >
                <p className="text-3xl font-semibold text-accent">{h.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {h.label}
                </p>
                {h.sub && (
                  <p className="mt-1 text-xs text-muted-foreground/70">
                    {h.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Our philosophy
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Clarity is clinical excellence.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              DENTASAGE instruments are designed around a single principle: the
              dentist should see exactly what is there. Every mirror is built
              with a front-surface coating calibrated to 99% average reflectance
              and a color difference of just 0.3 ΔE — restoring true colors
              where they matter most.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              From the slim mirror head to the ample finger space, every detail
              is engineered for the realities of daily clinical work.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center text-sm font-medium text-accent hover:underline"
            >
              Read our story →
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted">
            <Image
              src="/images/clinical/scene-1.jpg"
              alt="DENTASAGE mirror in clinical use"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Product showcase */}
      <section className="bg-muted/50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              The collection
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Designed for everyday clinical use
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Six reasons clinicians choose DENTASAGE
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-white p-8"
            >
              <h3 className="text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Equip your practice with precision.
          </h2>
          <p className="mt-4 text-base text-white/70">
            Bulk orders, multi-color clinic sets, and OEM finishes available.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
            >
              Browse products
            </Link>
            <a
              href="mailto:info@dentasage.com"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Contact sales
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
