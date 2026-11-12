"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Check, RotateCw } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

interface ProductShowcaseProps {
  product: Product;
}

export function ProductShowcase({ product }: ProductShowcaseProps) {
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0].id);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const selectedColor = product.colors.find((c) => c.id === selectedColorId) || product.colors[0];

  const handleAdd = () => {
    addItem({
      productId: product.slug,
      slug: product.slug,
      name: product.name,
      colorId: selectedColor.id,
      colorName: selectedColor.name,
      price: product.price,
      image: selectedColor.mainImage,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
      {/* Left: Large product image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#f5f5f7]">
        <Image
          key={selectedColor.id}
          src={selectedColor.mainImage}
          alt={`${product.name} in ${selectedColor.name}`}
          fill
          className="object-cover product-image-transition"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Right: Product details */}
      <div className="flex flex-col">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#6e6e73]">
          {product.series}
        </p>
        <h2 className="mb-4 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
          {product.name}
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-[#6e6e73]">{product.tagline}</p>

        {/* Color selector */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm font-medium text-[#1d1d1f]">Finish</span>
            <span className="text-sm text-[#6e6e73]">{selectedColor.name}</span>
          </div>
          <div className="flex items-center gap-4">
            {product.colors.map((color) => {
              const isSelected = color.id === selectedColorId;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColorId(color.id)}
                  aria-label={color.name}
                  className={cn(
                    "group relative flex h-12 w-12 items-center justify-center rounded-full transition-all",
                    isSelected ? "ring-2 ring-[#1d1d1f] ring-offset-2 ring-offset-white" : "ring-1 ring-black/10"
                  )}
                >
                  <span
                    className="h-9 w-9 rounded-full shadow-sm"
                    style={{ backgroundColor: color.hex }}
                  />
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white drop-shadow-md" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price */}
        <div className="mb-8">
          <p className="text-3xl font-semibold text-[#1d1d1f]">
            ${product.price.toFixed(2)} {product.currency}
          </p>
          <p className="text-sm text-[#6e6e73]">Per unit · Minimum order applies</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <button
            onClick={handleAdd}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium transition-all",
              added
                ? "bg-[#2b7a9b] text-white"
                : "bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90"
            )}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added to cart
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" /> Add to cart
              </>
            )}
          </button>
          <a
            href={`/products/${product.slug}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#1d1d1f]/20 px-8 py-4 text-sm font-medium text-[#1d1d1f] transition-all hover:bg-[#f5f5f7]"
          >
            <RotateCw className="h-4 w-4" /> 360° view
          </a>
        </div>
      </div>
    </div>
  );
}
