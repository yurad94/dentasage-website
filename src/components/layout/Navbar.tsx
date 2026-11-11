"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Product" },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const count = useCartStore((s) => s.count());

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[#1c1c1e]/80 backdrop-blur-xl border-b border-white/10"
          : "bg-gradient-to-b from-black/40 to-transparent"
      )}
    >
      <nav className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-4 sm:px-6">
        {/* Logo - white version for dark nav */}
        <Link href="/" className="flex items-center gap-2" aria-label="DENTASAGE home">
          <img
            src="/images/brand/logo-arrow.png"
            alt="DENTASAGE"
            className="h-5 w-auto brightness-0 invert"
          />
          <span className="text-[13px] font-medium tracking-[0.12em] text-white">
            DENTASAGE
          </span>
        </Link>

        {/* Desktop nav - Apple style */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[12px] font-normal transition-opacity hover:opacity-100",
                  isActive ? "text-white opacity-100" : "text-white/80 opacity-90"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/cart"
            className="relative rounded-full p-1.5 transition-opacity hover:opacity-70"
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-4 w-4 text-white" />
            {mounted && count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2b7a9b] px-1 text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            className="rounded-full p-1.5 transition-opacity hover:opacity-70 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-4 w-4 text-white" />
            ) : (
              <Menu className="h-4 w-4 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#1c1c1e]/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "border-b border-white/5 py-3 text-sm transition-opacity",
                    isActive ? "text-white" : "text-white/70"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
