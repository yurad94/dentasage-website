import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function HomePage() {
  const product = products[0];

  return (
    <>
      {/* ===== HERO: Apple-style immersive full-bleed banner ===== */}
      <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden bg-[#1c1c1e]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/lifestyle-1.jpg"
            alt="DENTASAGE dental instruments"
            fill
            className="object-cover opacity-70"
            sizes="100vw"
            priority
          />
          {/* Gradient overlays for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/40 to-[#1c1c1e]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        </div>

        {/* Centered hero content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/60 animate-fade-in-up">
            DENTASAGE · Sharp Series
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl animate-fade-in-up">
            Capture every
            <br />
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              detail.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70 animate-fade-in-up">
            Precision dental mirrors engineered for clinical clarity.
            <br className="hidden sm:block" />
            99% reflectance. 900+ sterilization cycles.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#1c1c1e] transition-opacity hover:opacity-90"
            >
              Explore the Sharp Mirror
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              View all products
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/40 p-1">
            <div className="h-2 w-0.5 animate-bounce rounded-full bg-white/60" />
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS: Apple-style metric strip ===== */}
      <section className="bg-[#1c1c1e] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-white/50">
            Engineered to exacting standards
          </p>
          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {product.highlights.map((h) => (
              <div key={h.label} className="text-center">
                <p className="text-4xl font-semibold tracking-tight text-white">
                  {h.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/50">
                  {h.label}
                </p>
                {h.sub && (
                  <p className="mt-1 text-[11px] leading-snug text-white/40">
                    {h.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCT SPOTLIGHT: large feature like Apple product page ===== */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Text */}
            <div className="order-2 lg:order-1">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Sharp Mirror
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                See what
                <br />
                matters most.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
                Front-surface coating calibrated to 99% average reflectance with
                a color difference of just 0.3 ΔE. Every detail — from the slim
                mirror head to the ample finger space — is shaped by daily
                clinical reality.
              </p>

              {/* Mini specs inline */}
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-8">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Reflectance
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-foreground">
                    99%
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Hardness
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-foreground">
                    9H
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Coating
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-foreground">
                    60 layers
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Sterilization
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-foreground">
                    900+ cycles
                  </dd>
                </div>
              </dl>

              <Link
                href={`/products/${product.slug}`}
                className="mt-8 inline-flex items-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Learn more →
              </Link>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-[#f5f5f7] to-white">
                <Image
                  src={product.colors[1]?.mainImage || product.colors[0].mainImage}
                  alt="DENTASAGE Sharp Mirror"
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY: split with clinical image ===== */}
      <section className="bg-[#f5f5f7] py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-white">
              <Image
                src="/images/clinical/scene-2.jpg"
                alt="DENTASAGE mirror in clinical use"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Our philosophy
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Clarity is clinical excellence.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                DENTASAGE instruments are designed around a single principle:
                the dentist should see exactly what is there. Every mirror is
                built with a front-surface coating calibrated to restore true
                colors where they matter most.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                From the slim mirror head to the ample finger space, every
                detail is engineered for the realities of daily clinical work.
              </p>
              <Link
                href="/about"
                className="mt-8 inline-flex w-fit items-center text-sm font-medium text-accent hover:underline"
              >
                Read our story →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRODUCT GRID ===== */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              The collection
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Designed for everyday clinical use
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
              A clean, practical design with a choice of finishes for clear
              visibility and comfortable handling.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="bg-[#f5f5f7] py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Every detail, considered.
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[28px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((f) => (
              <div key={f.title} className="bg-white p-8">
                <h3 className="text-base font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-[#1c1c1e] py-32 text-center text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Equip your practice
            <br />
            with precision.
          </h2>
          <p className="mt-6 text-base text-white/60">
            Bulk orders, multi-color clinic sets, and OEM finishes available.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#1c1c1e] transition-opacity hover:opacity-90"
            >
              Browse products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Contact sales
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
