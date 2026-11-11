import type { Metadata } from "next";
import { Mail, MessageCircle, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with DENTASAGE for product inquiries, bulk orders, OEM finishes, and partnership opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-32 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Get in touch
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Questions about our instruments, bulk orders, or OEM finishes? Our
          team is here to help.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <a
          href="mailto:info@dentasage.com"
          className="group flex flex-col items-center rounded-2xl border border-border bg-white p-8 transition-all hover:shadow-lg"
        >
          <Mail className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-sm font-semibold text-foreground">Email</h2>
          <p className="mt-2 text-xs text-muted-foreground group-hover:text-accent">
            info@dentasage.com
          </p>
        </a>

        <a
          href="https://wa.me/00000000000"
          className="group flex flex-col items-center rounded-2xl border border-border bg-white p-8 transition-all hover:shadow-lg"
        >
          <MessageCircle className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-sm font-semibold text-foreground">WhatsApp</h2>
          <p className="mt-2 text-xs text-muted-foreground group-hover:text-accent">
            Chat with us
          </p>
        </a>

        <div className="flex flex-col items-center rounded-2xl border border-border bg-white p-8">
          <Globe className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-sm font-semibold text-foreground">Website</h2>
          <p className="mt-2 text-xs text-muted-foreground">www.dentasage.com</p>
        </div>
      </div>

      {/* Inquiry form */}
      <form
        className="mt-12 rounded-2xl border border-border bg-muted/50 p-8"
        action="mailto:info@dentasage.com"
        method="post"
        encType="text/plain"
      >
        <h2 className="text-lg font-semibold text-foreground">
          Send us a message
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          />
        </div>
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          className="mt-4 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />
        <textarea
          name="message"
          placeholder="Tell us about your inquiry..."
          rows={5}
          required
          className="mt-4 w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-accent px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
