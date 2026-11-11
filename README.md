# DENTASAGE Website

Precision dental instruments brand website built with Next.js 14+ (App Router), Tailwind CSS v4, and Zustand.

## Features

- **Product showcase** with Apple-style color selector (image switches on color pick)
- **360° drag-to-rotate viewer** (36-frame sequence, pointer + touch support)
- **Specifications table** with full technical parameters
- **Shopping cart** (Zustand + localStorage persistence, B2B inquiry checkout)
- **Blog/Journal** with 3 starter articles (SEO-optimized)
- **SEO**: SSG pre-rendering, JSON-LD schema.org (Product, Article), dynamic sitemap, robots.txt, OG metadata
- **CN IP blocking** via Edge Middleware (`x-vercel-ip-country`)
- **Korean minimalist design** — clinical blue-teal accent, generous whitespace

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| State | Zustand + persist |
| Icons | lucide-react |
| Deploy | Vercel |

## Local Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Project Structure

```
src/
├── app/                    # App Router pages (all SSG)
│   ├── page.tsx            # Homepage
│   ├── products/           # Listing + [slug] detail
│   ├── cart/               # Shopping cart
│   ├── blog/               # Journal listing + [slug] posts
│   ├── about/              # Brand story
│   ├── blocked/            # CN block landing
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── layout/             # Navbar, Footer, Logo
│   ├── product/            # ColorSelector, Product360Viewer, Gallery, SpecTable
│   └── cart/               # CartProvider
├── lib/
│   ├── data/products.ts    # ← Product data (single source of truth)
│   ├── data/blog.ts        # ← Blog posts
│   ├── store/cart-store.ts # Zustand cart
│   └── utils.ts
middleware.ts               # CN/HK/TW IP blocking (Edge)
public/images/              # Product, hero, clinical, brand images
```

## Customizing Content

### Products
Edit `src/lib/data/products.ts` — update prices, colors, specs, images.

### Blog posts
Edit `src/lib/data/blog.ts` — add new posts with markdown-style content.

### Brand colors
Edit CSS variables in `src/app/globals.css` (`--accent`, `--foreground`, etc.).

### Contact email
Search-replace `info@dentasage.com` across `src/`.

## Deployment (Vercel)

1. **Push to GitHub** (create a repo and push this directory)
2. **Import to Vercel** → connect the GitHub repo (auto-detects Next.js)
3. **Custom domain**: Project Settings → Domains → add your domain → configure DNS:
   - CNAME `www` → `cname.vercel-dns.com`
   - A record `@` → `76.76.21.21`
4. **CN blocking** is automatic via `middleware.ts` (reads Vercel's `x-vercel-ip-country` header)
5. Vercel provisions HTTPS automatically

## Adding 360° Photos

Replace the placeholder frames in:
```
public/images/products/dentasage-sharp-mirror/360/frame-001.jpg ... frame-036.jpg
```
Shoot 36 photos (every 10°) on a turntable, name sequentially. No code changes needed.
