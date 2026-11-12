"use client";

interface SpecGridProps {
  highlights: { value: string; label: string; sub?: string }[];
}

export function SpecGrid({ highlights }: SpecGridProps) {
  return (
    <div>
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#6e6e73]">
          Specifications
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
          Engineered to exacting standards.
        </h2>
      </div>
      <div className="grid gap-px overflow-hidden rounded-3xl bg-[#d2d2d7] sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-center bg-white px-8 py-10 text-center transition-colors hover:bg-[#fafafa]"
          >
            <p className="mb-1 text-4xl font-semibold tracking-tight text-[#1d1d1f] md:text-5xl">
              {item.value}
            </p>
            <p className="mb-1 text-base font-medium text-[#1d1d1f]">{item.label}</p>
            {item.sub && <p className="text-sm text-[#6e6e73]">{item.sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
