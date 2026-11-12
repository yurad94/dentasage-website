"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Slide {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

interface FullscreenCarouselProps {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
  id?: string;
}

export default function FullscreenCarousel({
  slides,
  autoPlay = true,
  interval = 5000,
  id,
}: FullscreenCarouselProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, next]);

  return (
    <section
      id={id}
      className="fullscreen-section bg-black"
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 carousel-fade ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

          {/* Center content */}
          <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl">
            {slide.eyebrow && (
              <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-4 animate-fade-in-up">
                {slide.eyebrow}
              </p>
            )}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-6 animate-fade-in-up tracking-wide">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <p className="text-sm md:text-base text-white/60 mb-8 max-w-xl leading-relaxed animate-fade-in-up">
                {slide.subtitle}
              </p>
            )}
            {(slide.primaryCta || slide.secondaryCta) && (
              <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up">
                {slide.primaryCta && (
                  <a href={slide.primaryCta.href} className="btn-solid">
                    {slide.primaryCta.label}
                  </a>
                )}
                {slide.secondaryCta && (
                  <a href={slide.secondaryCta.href} className="btn-outline">
                    {slide.secondaryCta.label}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Left arrow */}
      {slides.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 arrow-btn"
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {slides.length > 1 && (
        <button
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 arrow-btn"
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Bottom progress indicator */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="progress-track"
              aria-label={`Slide ${i + 1}`}
            >
              <div
                className="progress-fill"
                style={{ width: i === current ? "100%" : "0%" }}
              />
            </button>
          ))}
        </div>
      )}

      {/* Scroll indicator (only on first section) */}
      {id === "hero" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2">
          <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full scroll-wheel" />
          </div>
        </div>
      )}
    </section>
  );
}
