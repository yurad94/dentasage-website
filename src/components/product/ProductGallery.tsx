"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductColor } from "@/lib/data/products";

interface ProductGalleryProps {
  color: ProductColor;
  productName: string;
}

export function ProductGallery({ color, productName }: ProductGalleryProps) {
  const gallery = color.gallery.length > 0 ? color.gallery : [color.mainImage];
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset index when color changes
  const activeImage = gallery[activeIndex] || gallery[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-white to-muted">
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${productName} — ${color.name}`}
          fill
          className="object-contain product-image-transition"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {gallery.map((img, i) => (
            <button
              key={`${img}-${i}`}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-muted transition-all",
                i === activeIndex
                  ? "border-accent"
                  : "border-border hover:border-muted-foreground"
              )}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-contain"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
