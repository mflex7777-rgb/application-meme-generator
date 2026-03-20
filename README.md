# Application Meme Generator ✨

A fun, playful tool that turns your career info into a shareable 1-page "application meme" — a scrapbook-style personal marketing card to help you stand out in your job search.

## How it works

Users fill out a form with their background, skills, dream jobs, and photos. Claude generates personalized copy and a unique color palette, and the tool renders a polished, printable 1-pager.

## Tech stack

- Vanilla HTML/CSS/JS frontend (no framework needed)
- Vercel serverless function as an API proxy (`/api/generate`)
- Anthropic Claude API for content generation

## Deploying

1. Clone this repo
2. In Vercel, add the environment variable:  
   `ANTHROPIC_API_KEY` = your Anthropic API key
3. Deploy — Vercel auto-detects the `api/` folder and serves `public/index.html`

## Local development

```bash
npm install -g vercel
vercel dev
```

Then open http://localhost:3000
