# ANM Software Solutions — Agency Site

Premium one-page agency website for **ANM Software Solutions**. Built with Next.js 14 (App Router), Tailwind CSS, and Resend for email.

- **Domain:** anmsoftwaresolutions.com
- **Tagline:** We Build AI Platforms for Local Businesses
- **Email:** anmdevlopmentservices@yahoo.com
- **Phone:** (818) 930-9738

## Stack

- Next.js 14 (App Router)
- Tailwind CSS 3
- TypeScript
- Resend (contact form)
- Google Fonts via `next/font/google` — **Syne** (headings) + **DM Sans** (body)

## Local dev

```bash
cd anm-site
npm install
cp .env.local.example .env.local   # then fill in RESEND_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` to `.env.local` and set:

```
RESEND_API_KEY=your_key_here
```

Get a key at [resend.com](https://resend.com/api-keys). Free tier is fine for launch — 3,000 emails/month.

> Note: the contact form sends to `anmdevlopmentservices@yahoo.com` from `onboarding@resend.dev` by default. Once you verify a domain in Resend (e.g. `hello@anmsoftwaresolutions.com`), swap the `from:` address in `app/api/contact/route.ts`.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option A — CLI (fastest)

```bash
npm install -g vercel
vercel login
vercel               # first-time setup
vercel env add RESEND_API_KEY   # paste your key, select Production
vercel --prod        # deploy production
```

### Option B — Dashboard

1. Push this branch to GitHub: `claude/anm-agency-website-V1MUp`
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. **Root Directory:** `anm-site`
4. **Framework Preset:** Next.js (auto-detected)
5. Add environment variable: `RESEND_API_KEY`
6. Click **Deploy**

### Point anmsoftwaresolutions.com at Vercel

After deploying:

1. In Vercel project → **Settings → Domains → Add**
2. Enter `anmsoftwaresolutions.com` and `www.anmsoftwaresolutions.com`
3. Vercel will show you the DNS records to add. Usually:
   - **A record** `@` → `76.76.21.21`
   - **CNAME** `www` → `cname.vercel-dns.com`
4. Log into Namecheap → **Domain List → Manage → Advanced DNS**
5. Delete the parking records and add the ones Vercel gave you
6. Wait 10-30 minutes for DNS propagation

## Project structure

```
anm-site/
├── app/
│   ├── api/contact/route.ts    # Resend email endpoint
│   ├── globals.css             # All custom CSS (gradient mesh, animations)
│   ├── layout.tsx              # Syne + DM Sans fonts
│   └── page.tsx                # One-page composition
├── components/
│   ├── Nav.tsx                 # Glass morphism nav + mobile hamburger
│   ├── Hero.tsx                # Animated gradient mesh + counting stats
│   ├── Services.tsx            # 6 service cards
│   ├── HowItWorks.tsx          # 4-step process
│   ├── CaseStudy.tsx           # PCG featured case study
│   ├── Industries.tsx          # 30 industry pill badges
│   ├── WhyAnm.tsx              # 3 feature cards (gold accent)
│   ├── Contact.tsx             # Booking form
│   ├── Footer.tsx              # 3-column dark footer
│   ├── FadeIn.tsx              # Intersection Observer wrapper
│   └── CountUp.tsx             # Animated number counter
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.js
```

## Design tokens

| Token          | Value      | Use |
|----------------|------------|-----|
| Primary (navy) | `#0f1a2e`  | Backgrounds, body text on light |
| Accent (blue)  | `#3b6fe8`  | Buttons, links, accents |
| Gold           | `#f5a623`  | Highlight CTAs, "Why ANM" section |
| Heading font   | Syne       | All `h1`–`h6` |
| Body font      | DM Sans    | All paragraphs and UI |

## What's inside

- Full 100vh hero with live animated gradient mesh + noise overlay
- Counting stats using Intersection Observer (no library)
- Glass morphism nav that activates on scroll
- 6 service cards with hover lift + glow
- 4-step "How It Works" with connecting line
- Featured case study card linking to live PCG site
- 30 industry pills with hover fill
- 3 "Why ANM" feature cards with gold accent
- Working contact form → Resend → `anmdevlopmentservices@yahoo.com`
- Dark 3-column footer
- Fully mobile responsive + slide-in hamburger menu
- All sections fade up on scroll
