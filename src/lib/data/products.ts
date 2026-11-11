export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  mainImage: string;
  gallery: string[];
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface Product {
  slug: string;
  name: string;
  series: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  colors: ProductColor[];
  specs: ProductSpec[];
  features: ProductFeature[];
  highlights: { value: string; label: string; sub?: string }[];
  images360: string[];
  category: string;
  isNew?: boolean;
  badge?: string;
}

// Generate 360 frame paths (36 frames)
function frames360(prefix: string): string[] {
  return Array.from({ length: 36 }, (_, i) => `${prefix}/frame-${String(i + 1).padStart(3, "0")}.jpg`);
}

const mirror360 = "/images/products/dentasage-sharp-mirror/360";

export const products: Product[] = [
  {
    slug: "dentasage-sharp-mirror",
    name: "DENTASAGE Sharp Mirror",
    series: "Sharp Series",
    tagline: "Capture every detail",
    description:
      "The DENTASAGE Sharp Mirror is a precision front-surface dental mirror engineered for clinical clarity. With 99% average reflectance, a 9H hardened coating, and a biomimetic hydrophobic surface, it delivers true-color, distortion-free reflection through 900+ sterilization cycles.",
    price: 12.0,
    currency: "USD",
    colors: [
      {
        id: "grey",
        name: "Surgical Grey",
        hex: "#8a8d91",
        mainImage: "/images/products/dentasage-sharp-mirror/group-1.jpg",
        gallery: [
          "/images/products/dentasage-sharp-mirror/group-1.jpg",
          "/images/products/dentasage-sharp-mirror/group-2.jpg",
        ],
      },
      {
        id: "coral",
        name: "Signal Coral",
        hex: "#e85d4a",
        mainImage: "/images/products/dentasage-sharp-mirror/coral/main.jpg",
        gallery: [
          "/images/products/dentasage-sharp-mirror/coral/main.jpg",
          "/images/products/dentasage-sharp-mirror/coral/side.jpg",
          "/images/products/dentasage-sharp-mirror/coral/reverse.jpg",
        ],
      },
      {
        id: "pink",
        name: "Soft Pink",
        hex: "#f4a6c0",
        mainImage: "/images/products/dentasage-sharp-mirror/pink/main.jpg",
        gallery: [
          "/images/products/dentasage-sharp-mirror/pink/main.jpg",
        ],
      },
    ],
    specs: [
      { label: "Average Reflectance", value: "99%" },
      { label: "Color Difference", value: "0.3 ΔE" },
      { label: "Coating Layers", value: "60 layers" },
      { label: "Surface Hardness", value: "9H" },
      { label: "Hydrophobic Angle", value: "120°" },
      { label: "Sterilization Cycles", value: "900+" },
      { label: "Mirror Type", value: "Front surface coating" },
      { label: "Mirror Sizes (Sharp)", value: "4# / 22mm, 5# / 24mm" },
      { label: "Mirror Sizes (Sharp Smart)", value: "00# / 12mm, 0# / 14mm" },
      { label: "Sterilization", value: "134°C / 4 min or 121°C / 20 min" },
      { label: "Frame Design", value: "Slim head · Narrow frame · Clip-in" },
      { label: "Reusable", value: "Yes (non-sterile, sterilize before use)" },
    ],
    features: [
      {
        title: "Front Surface Coating",
        description: "Precisely sharp reflection with 99% average reflectance for true-color diagnostics.",
      },
      {
        title: "Clip-in Mirror",
        description: "Secure clip-in mechanism — not easy to detach during procedures.",
      },
      {
        title: "Floating Mirror Design",
        description: "Hassle-free hygienic cleaning with a floating mirror that resists debris buildup.",
      },
      {
        title: "Slim Mirror Head",
        description: "Compact and handy design for comfortable access in the oral cavity.",
      },
      {
        title: "Narrow Frame",
        description: "Broad vision during clinical procedures with an ultra-narrow frame profile.",
      },
      {
        title: "Ample Finger Space",
        description: "Secure, comfortable ergonomic hold for precise maneuvering.",
      },
    ],
    highlights: [
      { value: "99%", label: "Average Reflectance", sub: "Subtle light, precise capture" },
      { value: "0.3", label: "Color Difference", sub: "Restoring true colors" },
      { value: "60", label: "Coating Layers", sub: "Crystal-clear view" },
      { value: "9H", label: "Surface Hardness", sub: "Wear and scratch resistant" },
      { value: "120°", label: "Hydrophobic Angle", sub: "Clean and easy to maintain" },
      { value: "900+", label: "Sterilization Cycles", sub: "Enduring durability" },
    ],
    images360: frames360(mirror360),
    category: "dental-mirror",
    isNew: true,
    badge: "Sharp Series",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
