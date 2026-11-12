import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dentasage.com"),
  title: "DENTASAGE — Precision Dental Mirrors",
  description:
    "DENTASAGE crafts premium dental mirrors engineered for clarity, durability, and ergonomic precision. Coming soon.",
  keywords: [
    "dental mirror",
    "dental instruments",
    "dentasage",
    "front surface mirror",
    "dental tools",
  ],
  authors: [{ name: "DENTASAGE" }],
  creator: "DENTASAGE",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dentasage.com",
    siteName: "DENTASAGE",
    title: "DENTASAGE — Precision Dental Mirrors",
    description:
      "Premium dental mirrors engineered for clarity, durability, and ergonomic precision. Coming soon.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DENTASAGE — Precision Dental Mirrors",
    description:
      "Premium dental mirrors engineered for clarity, durability, and ergonomic precision. Coming soon.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#f5f5f7] text-[#1d1d1f]">
        {children}
      </body>
    </html>
  );
}
