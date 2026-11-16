import { NextRequest, NextResponse } from "next/server";

// Countries blocked from accessing the site
const BLOCKED_COUNTRIES = ["CN", "HK", "TW"];

// Preview password (kept for internal preview access)
const PREVIEW_SECRET = "dentasage-admin-2026";

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") || "";
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Allow access to the blocked page itself (so we don't loop)
  if (pathname === "/blocked") {
    return NextResponse.next();
  }

  // Block CN/HK/TW — redirect to blocked page
  if (BLOCKED_COUNTRIES.includes(country)) {
    return NextResponse.redirect(new URL("/blocked", request.url));
  }

  // Preview mode — set cookie and redirect to clean URL
  const previewParam = url.searchParams.get("preview");
  if (previewParam === PREVIEW_SECRET) {
    const response = NextResponse.redirect(new URL(pathname, request.url));
    response.cookies.set("dentasage-preview", "true", {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return response;
  }

  // Site is live — allow all other traffic
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images).*)"],
};
