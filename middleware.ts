import { NextRequest, NextResponse } from "next/server";

// Countries blocked from accessing the site
const BLOCKED_COUNTRIES = ["CN", "HK", "TW"];

// Preview password — change this to your own secret
const PREVIEW_SECRET = "dentasage-admin-2026";

const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>DENTASAGE — Under Construction</title>
<meta name="robots" content="noindex, nofollow">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    background: #1c1c1e;
    color: #ffffff;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-font-smoothing: antialiased;
  }
  .container {
    text-align: center;
    padding: 2rem;
    max-width: 520px;
  }
  h1 {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
    line-height: 1.6;
    color: rgba(255,255,255,0.6);
    margin-bottom: 1rem;
  }
  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid rgba(255,255,255,0.2);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 2rem auto 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .brand {
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    margin-bottom: 3rem;
    opacity: 0.9;
  }
  .footer {
    position: absolute;
    bottom: 2rem;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.75rem;
    color: rgba(255,255,255,0.3);
  }
</style>
</head>
<body>
  <div class="container">
    <div class="brand">DENTASAGE</div>
    <h1>We're building something precise.</h1>
    <p>Our website is currently under construction.</p>
    <p>We're crafting a refined experience for dental professionals.</p>
    <p>Please check back soon.</p>
    <div class="spinner"></div>
  </div>
  <div class="footer">&copy; ${new Date().getFullYear()} DENTASAGE. All rights reserved.</div>
</body>
</html>`;

export function middleware(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country") || "";
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Allow access to the blocked page itself (so we don't loop)
  if (pathname === "/blocked") {
    return NextResponse.next();
  }

  // Block CN/HK/TW
  if (BLOCKED_COUNTRIES.includes(country)) {
    return NextResponse.redirect(new URL("/blocked", request.url));
  }

  // ===== Maintenance mode =====
  // Check if preview mode is being activated via ?preview=SECRET
  const previewParam = url.searchParams.get("preview");
  if (previewParam === PREVIEW_SECRET) {
    const response = NextResponse.next();
    response.cookies.set("dentasage-preview", "true", {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    // Redirect to clean URL (remove the query param)
    const cleanUrl = new URL(pathname, request.url);
    const redirectResponse = NextResponse.redirect(cleanUrl);
    redirectResponse.cookies.set("dentasage-preview", "true", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
    return redirectResponse;
  }

  // Check if visitor already has the preview cookie
  const hasPreviewCookie = request.cookies.get("dentasage-preview")?.value === "true";

  // Allow static assets, robots, sitemap through even in maintenance
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml";

  if (hasPreviewCookie || isStaticAsset) {
    return NextResponse.next();
  }

  // Everyone else sees the maintenance page
  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "86400",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images).*)"],
};
