import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About DENTASAGE",
  description:
    "DENTASAGE designs precision dental instruments engineered for clarity, durability, and ergonomic comfort. Learn about our design philosophy and manufacturing standards.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          About
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Built for what clinicians actually see.
        </h1>
      </div>

      <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-3xl bg-muted">
        <Image
          src="/images/brand/poster.jpg"
          alt="DENTASAGE dental mirrors"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
        />
      </div>

      <div className="mt-12 space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          DENTASAGE is a dental instrument brand focused on a single category
          done exceptionally well: the dental mirror. We believe that the mirror
          is the most-used, most-overlooked tool in the operatory — and that
          clarity at this fundamental layer elevates every diagnosis that
          follows.
        </p>
        <p>
          Our mirrors are built with front-surface coatings calibrated to 99%
          average reflectance and a color difference of just 0.3 ΔE. A 60-layer
          coating stack and 9H surface hardness protect the reflective surface
          through 900+ sterilization cycles, while a 120° hydrophobic angle
          keeps the mirror clean between patients.
        </p>
        <p>
          Every detail — from the slim mirror head and narrow frame to the
          ample finger space and clip-in floating mirror — is shaped by the
          realities of daily clinical work. The result is an instrument that
          feels considered in the hand and precise in the mouth.
        </p>
      </div>

      {/* Values */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {[
          {
            title: "Precision",
            body: "99% reflectance and 0.3 ΔE color difference restore true clinical colors.",
          },
          {
            title: "Durability",
            body: "9H hardness and 900+ sterilization cycles tested for enduring reliability.",
          },
          {
            title: "Ergonomics",
            body: "Slim head, narrow frame, and ample finger space designed for daily use.",
          },
        ].map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-border bg-white p-6"
          >
            <h3 className="text-lg font-semibold text-foreground">{v.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
