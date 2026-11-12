"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface BannerSlide {
  image: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

const slides: BannerSlide[] = [
  {
    image: "/images/hero/lifestyle-1.jpg",
    eyebrow: "DENTASAGE · Sharp Series",
    title: "Capture every",
    titleAccent: "detail.",
    description:
      "Precision dental mirrors engineered for clinical clarity. 99% reflectance. 900+ sterilization cycles.",
    cta: { label: "Explore the Sharp Mirror", href: "/products/dentasage-sharp-mirror" },
    ctaSecondary: { label: "View all products", href: "/products" },
  },
  {
    image: "/images/hero/lifestyle-2.jpg",
    eyebrow: "Front-Surface Coating",
    title: "True colors",
    titleAccent: "where they matter.",
    description:
      "99% average reflectance with just 0.3 ΔE color difference. See exactly what is there.",
    cta: { label: "Discover the technology", href: "/about" },
    ctaSecondary: { label: "Read the journal", href: "/blog" },
  },
  {
    image: "/images/hero/lifestyle-3.jpg",
    eyebrow: "Built for Daily Practice",
    title: "900+ cycles.",
    titleAccent: "Zero compromise.",
    description:
      "9H hardened coating, 60-layer construction, 120° hydrophobic surface. Engineered to endure.",
    cta: { label: "See specifications", href: "/products/dentasage-sharp-mirror" },
    ctaSecondary: { label: "Contact sales", href: "/contact" },
  },
];

export function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goTo = (index: number) => setCurrent(index);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused, current]);

  return (
    <section
      className="relative h-[100vh] w-full overflow-hidden bg-[#1c1c1e]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] via-[#1c1c1e]/30 to-[#1c1c1e]/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="max-w-2xl">
                <p
                  className={`text-xs font-medium uppercase tracking-[0.3em] text-white/60 ${
                    index === current ? "animate-fade-in-up" : ""
                  }`}
                >
                  {slide.eyebrow}
                </p>
                <h1
                  className={`mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl ${
                    index === current ? "animate-fade-in-up" : ""
                  }`}
                >
                  {slide.title}
                  <br />
                  <span className="bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                    {slide.titleAccent}
                  </span>
                </h1>
                <p
                  className={`mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg ${
                    index === current ? "animate-fade-in-up" : ""
                  }`}
                >
                  {slide.description}
                </p>
                <div
                  className={`mt-10 flex flex-col gap-3 sm:flex-row ${
                    index === current ? "animate-fade-in-up" : ""
                  }`}
                >
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#1c1c1e] transition-opacity hover:opacity-90"
                  >
                    {slide.cta.label}
                  </Link>
                  {slide.ctaSecondary && (
                    <Link
                      href={slide.ctaSecondary.href}
                      className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                    >
                      {slide.ctaSecondary.label}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-8 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 right-8 z-20 hidden sm:block">
        <span className="text-sm font-medium text-white/50">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
