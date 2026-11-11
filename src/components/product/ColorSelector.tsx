"use client";

import { cn } from "@/lib/utils";
import type { ProductColor } from "@/lib/data/products";

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedId: string;
  onSelect: (colorId: string) => void;
}

export function ColorSelector({ colors, selectedId, onSelect }: ColorSelectorProps) {
  const selected = colors.find((c) => c.id === selectedId);

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">Finish:</span>
        <span className="text-sm text-muted-foreground">
          {selected?.name || "—"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {colors.map((color) => {
          const isSelected = color.id === selectedId;
          return (
            <button
              key={color.id}
              onClick={() => onSelect(color.id)}
              aria-label={color.name}
              aria-pressed={isSelected}
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200",
                isSelected ? "scale-110" : "hover:scale-105"
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 rounded-full ring-1 ring-inset ring-black/10",
                  isSelected && "ring-2 ring-accent ring-offset-2 ring-offset-white"
                )}
                style={{ backgroundColor: color.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
