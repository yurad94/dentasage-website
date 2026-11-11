"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-24 text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-accent mx-auto" />
      </div>
    );
  }

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/40" />
        <h1 className="mt-6 text-2xl font-semibold text-foreground">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Browse our instruments and add what you need.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Your cart
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {items.length} item{items.length > 1 ? "s" : ""}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.colorId}`}
              className="flex gap-4 rounded-2xl border border-border bg-white p-4"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <div>
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-medium text-foreground hover:text-accent"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Finish: {item.colorName}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.colorId)}
                    className="text-muted-foreground transition-colors hover:text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.colorId,
                          item.quantity - 1
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.colorId,
                          item.quantity + 1
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-muted"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <p className="font-semibold text-foreground">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm text-muted-foreground transition-colors hover:text-red-500"
          >
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border bg-muted/50 p-6">
            <h2 className="text-lg font-semibold text-foreground">Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-muted-foreground">Calculated at inquiry</span>
              </div>
            </div>
            <div className="mt-4 border-t border-border pt-4">
              <div className="flex justify-between text-base">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-semibold text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <a
              href="mailto:info@dentasage.com?subject=Order%20Inquiry%20—%20DENTASAGE"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Request a quote
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Checkout is handled via direct inquiry for B2B orders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
