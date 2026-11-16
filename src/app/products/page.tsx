import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Products — Dental Mirrors & Instruments",
  description:
    "Explore the DENTASAGE product range. Precision dental mirrors engineered for clinical clarity, durability, and ergonomic comfort.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.15em] text-accent sm:tracking-[0.2em] sm:text-sm">
          DENTASAGE Collection
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Precision in every reflection
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground sm:mt-4 sm:text-base lg:text-lg">
          Dental instruments designed for clear visibility and comfortable
          handling — a clean, practical choice for everyday clinical use.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl bg-muted p-6 text-center sm:mt-16 sm:p-8 lg:p-12">
        <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
          Need a custom configuration?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-xs text-muted-foreground sm:text-sm">
          We support bulk orders, clinic-specific color sets, and OEM finishes.
          Reach out to our team for a tailored quote.
        </p>
        <a
          href="mailto:info@dentasage.com"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-foreground px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-white"
        >
          Contact sales
        </a>
      </div>
    </div>
  );
}
