"use client";

import { useEffect, useState } from "react";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render children always; hydration mismatches are handled in individual components
  return <>{children}</>;
}
