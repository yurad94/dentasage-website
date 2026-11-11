export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "front-surface-coating-explained",
    title: "Why front-surface coating matters in a dental mirror",
    excerpt:
      "A front-surface coating eliminates the double-image effect of conventional mirrors. Here is what that means for clinical diagnosis.",
    date: "2026-05-20",
    readingTime: "4 min read",
    category: "Engineering",
    content: `## The problem with conventional mirrors

A conventional glass mirror reflects from both the front surface of the glass and the silvered backing. The result is a faint secondary image — a "ghost" — that slightly offsets the true reflection. In a dental operatory, that offset obscures fine detail exactly where it matters most: marginal ridges, fracture lines, and the interface of a restoration.

## What front-surface coating changes

A front-surface (or front-silvered) mirror places the reflective coating on the front of the glass. Light reflects once, directly, with no secondary ghost. The DENTASAGE Sharp Mirror uses a front-surface coating calibrated to **99% average reflectance** with a color difference of just **0.3 ΔE** — meaning the colors you see in the mirror are the colors actually present in the mouth.

## Why reflectance and color difference matter together

Reflectance alone does not guarantee accuracy. A mirror can be bright yet shift hues. By holding both reflectance (99%) and color difference (0.3 ΔE) to tight tolerances, the Sharp Mirror restores true colors — supporting more confident diagnosis and shade matching.`,
  },
  {
    slug: "choosing-a-mirror-color",
    title: "Choosing a mirror finish for your practice",
    excerpt:
      "Surgical grey, signal coral, or soft pink? A practical guide to selecting mirror finishes for clinical and organizational use.",
    date: "2026-05-15",
    readingTime: "3 min read",
    category: "Clinical",
    content: `## Color as organization

In a busy practice, mirror color often serves as a visual coding system. A common approach is to assign colors to specific operators, procedure types, or sterilization batches — making it easy to confirm at a glance that the right instrument is in hand.

## The DENTASAGE finishes

- **Surgical Grey** — neutral and unobtrusive, suited to practices that prefer a uniform clinical look.
- **Signal Coral** — high-visibility, useful when you need the instrument to stand out against gloved hands and tray linings.
- **Soft Pink** — a calm, distinctive finish often used to distinguish a specific operator or workflow.

All finishes share the same front-surface optical performance. The color is purely an organizational and aesthetic choice — the reflection is identical.`,
  },
  {
    slug: "sterilization-cycles-explained",
    title: "900+ sterilization cycles: what that number means",
    excerpt:
      "We test every mirror coating through 900+ autoclave cycles. Here is why cycle count is the real measure of a mirror's value.",
    date: "2026-05-10",
    readingTime: "4 min read",
    category: "Engineering",
    content: `## The real cost of a dental mirror

The purchase price of a mirror matters far less than its cost per use. A mirror that degrades after 100 sterilization cycles needs replacing several times a year. A mirror that holds its reflectance through 900+ cycles delivers a fraction of the cost per use.

## How we test

Each DENTASAGE mirror coating is subjected to repeated autoclave cycles at **134°C / 4 minutes** (or **121°C / 20 minutes**). Reflectance and coating integrity are measured at intervals to confirm that the 60-layer coating stack and 9H surface hardness continue to perform.

## What protects the coating

Three factors work together: the **60-layer coating stack** distributes stress across the optical surface, the **9H surface hardness** resists the scratches that would otherwise compromise reflectance, and the **120° hydrophobic angle** reduces residue adhesion between cycles. The result is a mirror that stays clinically accurate for longer.`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
