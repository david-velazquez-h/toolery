# Toolery

Fast, focused developer tools that run entirely in your browser. No accounts, no ads, no data ever leaving your machine.

**Live:** [toolery.vercel.app](https://toolery.vercel.app)

## Why Toolery

Most developer-tool websites are cluttered with ads, slow to load, and inconsistent from one tool to the next. Toolery is a single, fast, consistently designed workspace for the small tasks developers do every day — formatting JSON, decoding a JWT, generating a UUID.

Every tool runs 100% client-side. Nothing you paste is ever sent to a server.

## Tools (v1.0)

- **JSON Formatter** — format, validate and minify JSON
- **JWT Debugger** — decode and inspect JWT header/payload
- **UUID Generator** — generate v4 UUIDs in bulk
- **Base64 Encoder/Decoder** — encode/decode with full UTF-8 support
- **Timestamp Converter** — convert Unix timestamps to human-readable dates, with automatic seconds/milliseconds detection

## Roadmap

- [ ] Regex Tester
- [ ] URL Encoder/Decoder
- [ ] Hash Generator (MD5, SHA-1, SHA-256)
- [ ] Color Picker/Converter
- [ ] Markdown Preview
- [ ] SQL Formatter
- [ ] Cron Expression Builder

## Tech Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- Deployed on [Vercel](https://vercel.com)
- No backend — every tool is a pure client-side function

## Architecture

Business logic lives in `src/lib/tools/`, completely decoupled from React — pure, typed functions that are easy to test and reuse. UI components in `src/components/tools/` only handle presentation and call into that logic. Every tool is registered in a single config file (`src/config/tools.config.ts`), which drives the homepage grid, navigation and metadata — adding a new tool never requires touching more than one place.

src/
├── app/(tools)/<tool-slug>/page.tsx # Route + SEO metadata
├── components/tools/<tool-slug>/ # UI components
├── lib/tools/<tool-slug>.ts # Pure business logic
└── config/tools.config.ts # Single source of truth for all tools


## Getting Started

```bash
git clone https://github.com/david-velazquez-h/toolery.git
cd toolery
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## License

MIT