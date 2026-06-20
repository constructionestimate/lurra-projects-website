# Lurra Projects — Cinematic Website

## Live links

- **GitHub:** https://github.com/constructionestimate/lurra-projects-website
- **Vercel preview:** https://lurra-projects-website.vercel.app
- **Custom domain (after DNS):** https://lurraprojects.com.au

## Hero video

- Source: Higgsfield Kling v3.0 (indoor-to-outdoor garden journey)
- File: `public/hero-journey.mp4`
- Scroll frames: `public/frames/` (361 JPEGs @ 24fps)
- Re-extract after replacing video:

```bash
node scripts/extract-hero-frames.mjs
```

## Replace placeholder gallery images

Edit `src/components/GallerySection.tsx` — swap gradient placeholders for real project photos:

```tsx
<Image src="/projects/mentone-courtyard.jpg" alt="..." fill className="object-cover" />
```

Add images under `public/projects/`.

## Update copy

- Hero overlay: `src/components/ScrollHero.tsx`
- Sections: `src/components/ExperienceSection.tsx`, `ProcessSection.tsx`, `WhySection.tsx`
- Contact: `src/components/ContactSection.tsx`

## Add testimonials

Create `src/components/TestimonialsSection.tsx` and import it in `src/app/page.tsx` above the contact section.

## Supabase contact form

Env vars (Vercel → Settings → Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (recommended for API route inserts)

Table: `lurra_contacts` (migration in `supabase/migrations/`)

## Point GoDaddy domain to Vercel

1. Vercel project → **Settings → Domains** → add `lurraprojects.com.au` and `www.lurraprojects.com.au`
2. In GoDaddy DNS, set:
   - **A** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`
3. Wait for SSL (usually minutes). Remove old GoDaddy parking records if present.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill Supabase keys.