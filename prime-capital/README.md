# Prime Capital Group, Inc. — Platform

Full website + admin dashboard for Prime Capital Group, Inc., a private and hard money lender in Burbank, CA.

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- @dnd-kit for Kanban drag & drop
- Anthropic API (Claude) for Document Vault AI + Admin AI Assistant
- Perplexity API for public website chat widget
- localStorage for all data persistence
- PWA support

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Keys

Create `.env.local`:

```
NEXT_PUBLIC_PERPLEXITY_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
```

- Get Anthropic key at [console.anthropic.com](https://console.anthropic.com)
- Get Perplexity key at [perplexity.ai/settings/api](https://perplexity.ai/settings/api)

**Note:** The app works fully without API keys — AI features fall back to intelligent demo responses.

## Admin Dashboard

Login: `garik@primecapitalgroupinc.com` / `pcg2024`

Access at [http://localhost:3000/admin](http://localhost:3000/admin)

## Deploy to Vercel

```bash
npx vercel
```
