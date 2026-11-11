"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import type { Product, ProductColor } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";

interface AddToCartButtonProps {
  product: Product;
  selectedColor: ProductColor;
}

export function AddToCartButton({ product, selectedColor }: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

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
    <button
      onClick={handleAdd}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] sm:w-auto"
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Added to cart
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" />
          Add to cart · {formatPrice(product.price, product.currency)}
        </>
      )}
    </button>
  );
}
