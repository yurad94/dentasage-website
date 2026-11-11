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
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          DENTASAGE Collection
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Precision in every reflection
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          Dental instruments designed for clear visibility and comfortable
          handling — a clean, practical choice for everyday clinical use.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-muted p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold text-foreground">
          Need a custom configuration?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
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
