import Link from "next/link";
import { Mail, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1c1c1e] text-white">
      <div className="mx-auto max-w-[980px] px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2" aria-label="DENTASAGE home">
              <img
                src="/images/brand/logo-arrow.png"
                alt="DENTASAGE"
                className="h-5 w-auto brightness-0 invert"
              />
              <span className="text-sm font-medium tracking-[0.12em]">
                DENTASAGE
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/50">
              Precision dental instruments engineered for clarity, durability,
              and ergonomic comfort.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Products
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-xs text-white/70 transition-colors hover:text-white"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products/dentasage-sharp-mirror"
                  className="text-xs text-white/70 transition-colors hover:text-white"
                >
                  Sharp Mirror
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-xs text-white/70 transition-colors hover:text-white"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Company
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-xs text-white/70 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-xs text-white/70 transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs text-white/70 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40">
              Connect
            </h3>
            <ul className="mt-3 space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-white/40" />
                <a
                  href="mailto:info@dentasage.com"
                  className="text-xs text-white/70 transition-colors hover:text-white"
                >
                  info@dentasage.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-white/40" />
                <span className="text-xs text-white/70">www.dentasage.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-[11px] text-white/40">
            © {new Date().getFullYear()} DENTASAGE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
