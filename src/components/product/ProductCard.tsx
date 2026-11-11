import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryColor = product.colors[0];

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-white to-muted">
        <Image
          src={primaryColor.mainImage}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.isNew && (
          <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
            New
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.series}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {product.tagline}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <span
                key={color.id}
                className="h-3.5 w-3.5 rounded-full ring-1 ring-inset ring-black/10"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
