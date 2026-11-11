import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/blocked"],
    },
    sitemap: "https://www.dentasage.com/sitemap.xml",
    host: "https://www.dentasage.com",
  };
}
