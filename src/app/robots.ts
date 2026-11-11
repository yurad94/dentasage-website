import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/blocked"],
    },
    sitemap: "https://dentasage.com/sitemap.xml",
    host: "https://dentasage.com",
  };
}
