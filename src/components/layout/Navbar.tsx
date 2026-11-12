"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/cases", label: "Cases" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = useCartStore((state) => state.items.reduce((acc, item) => acc + item.quantity, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-black/5"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Left: Nav links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#1d1d1f]/80 transition-colors hover:text-[#1d1d1f]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <Image
              src="/images/generated/logo-dentasage-light.png"
              alt="DENTASAGE"
              width={160}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>

          {/* Right: Actions */}
          <div className="hidden items-center gap-6 md:flex">
            <button aria-label="Search" className="text-[#1d1d1f]/80 hover:text-[#1d1d1f]">
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/cart"
              className="relative text-[#1d1d1f]/80 hover:text-[#1d1d1f]"
              aria-label="Shopping cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#1d1d1f] px-1 text-[10px] font-medium text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#1d1d1f]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-white px-6 py-8 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-semibold text-[#1d1d1f]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 text-2xl font-semibold text-[#1d1d1f]"
            >
              Cart
              {cartCount > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#1d1d1f] px-2 text-sm text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
