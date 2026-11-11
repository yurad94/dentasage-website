import { NextRequest, NextResponse } from "next/server";

// Countries blocked from accessing the site
const BLOCKED_COUNTRIES = ["CN", "HK", "TW"];

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") || "";

  // Allow access to the blocked page itself (so we don't loop)
  if (request.nextUrl.pathname === "/blocked") {
    return NextResponse.next();
  }

  if (BLOCKED_COUNTRIES.includes(country)) {
    return NextResponse.redirect(new URL("/blocked", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images).*)"],
};
