import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Access Restricted",
  description: "This content is not available in your region.",
  robots: { index: false, follow: false },
};

export default function BlockedPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-6 h-12 w-12 rounded-full bg-muted" />
        <h1 className="text-2xl font-semibold text-foreground">
          This site is not available in your region
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          We apologize for the inconvenience. DENTASAGE is currently unable to
          provide service in your location.
        </p>
        <p className="mt-6 text-xs text-muted-foreground/60">
          For inquiries, please contact info@dentasage.com
        </p>
      </div>
    </div>
  );
}
