import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dentasage.com"),
  title: {
    default: "DENTASAGE — Precision Dental Instruments",
    template: "%s | DENTASAGE",
  },
  description:
    "DENTASAGE designs and manufactures premium dental mirrors and instruments. Engineered for clarity, durability, and ergonomic precision in everyday clinical use.",
  keywords: [
    "dental mirror",
    "dental instruments",
    "dentasage",
    "front surface mirror",
    "dental tools",
    "clinical dental equipment",
  ],
  authors: [{ name: "DENTASAGE" }],
  creator: "DENTASAGE",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.dentasage.com",
    siteName: "DENTASAGE",
    title: "DENTASAGE — Precision Dental Instruments",
    description:
      "Premium dental mirrors engineered for clarity, durability, and ergonomic precision.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DENTASAGE — Precision Dental Instruments",
    description:
      "Premium dental mirrors engineered for clarity, durability, and ergonomic precision.",
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CartProvider>
          <Navbar />
          <main className="flex-1 pt-12">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
