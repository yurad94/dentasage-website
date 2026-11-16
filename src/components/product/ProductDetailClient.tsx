"use client";

import { useState } from "react";
import type { Product } from "@/lib/data/products";
import { Product360Viewer } from "./Product360Viewer";

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedColorId, setSelectedColorId] = useState(
    product.colors.find((c) => c.id === "black")?.id || product.colors[0].id
  );
  // selectedColorId kept for potential future use
  void selectedColorId;
  void setSelectedColorId;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Left: 360° viewer */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-2 text-center lg:text-left">
          <p className="text-xs text-muted-foreground">
            Drag to rotate · 360° interactive view
          </p>
        </div>
        <Product360Viewer
          images={product.images360}
          alt={`${product.name} 360 degree view`}
          className="mx-auto w-full max-w-xl"
        />
      </div>

      {/* Right: minimal info */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          {product.badge && (
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {product.badge}
            </span>
          )}
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {product.series}
          </span>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {product.name}
        </h1>
      </div>
    </div>
  );
}
