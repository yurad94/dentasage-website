"use client";

import { useState } from "react";
import type { Product } from "@/lib/data/products";
import { ProductGallery } from "./ProductGallery";
import { ColorSelector } from "./ColorSelector";
import { AddToCartButton } from "./AddToCartButton";

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0].id);
  const selectedColor =
    product.colors.find((c) => c.id === selectedColorId) || product.colors[0];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Left: Gallery */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ProductGallery color={selectedColor} productName={product.name} />
      </div>

      {/* Right: Info */}
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
        <p className="mt-2 text-lg text-muted-foreground">{product.tagline}</p>

        <p className="mt-6 text-base leading-relaxed text-foreground/80">
          {product.description}
        </p>

        {/* Highlights */}
        <div className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
          {product.highlights.slice(0, 3).map((h) => (
            <div key={h.label} className="text-center">
              <p className="text-2xl font-semibold text-accent">{h.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{h.label}</p>
            </div>
          ))}
        </div>

        {/* Color selector */}
        <div className="mt-8">
          <ColorSelector
            colors={product.colors}
            selectedId={selectedColorId}
            onSelect={setSelectedColorId}
          />
        </div>

        {/* Price + Add to cart */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <AddToCartButton product={product} selectedColor={selectedColor} />
        </div>

        {/* Reassurance */}
        <div className="mt-8 space-y-2 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            ✓ 900+ sterilization cycles tested
          </p>
          <p className="text-sm text-muted-foreground">
            ✓ Front surface coating · 99% reflectance
          </p>
          <p className="text-sm text-muted-foreground">
            ✓ Reusable · sterilize before use (134°C / 4 min)
          </p>
        </div>
      </div>
    </div>
  );
}
