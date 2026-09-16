# Emmanuel Josh Velo - Portfolio

A professional, responsive portfolio for Emmanuel Josh Velo, presenting verified work as a Web Developer and Software Engineer in the Philippines.

## Included

- Sticky desktop and mobile navigation with active-section state
- Responsive hero, about, selected projects, technical skills, contact, and footer sections
- Six evidence-based case studies using real project screenshots and repository details
- Desktop orbital project explorer with a conventional responsive grid fallback
- Accessible project-detail dialog and keyboard-friendly project controls
- Strongly validated inquiry composer that prepares a real email draft without silently storing or discarding submissions
- Downloadable two-page PDF resume
- Open Graph image, favicon, canonical configuration, Person structured data, sitemap, and robots rules
- Reduced-motion support, keyboard focus states, responsive images, and lazy-loaded below-fold media

## Local development

Requirements: Node.js 22.13 or newer and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed by the development server, normally `http://localhost:3000`.

## Quality checks

```powershell
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

The browser suite uses an installed Google Chrome through Playwright's `chrome` channel. It covers desktop and mobile navigation, project filtering and details, form validation and email handoff, metadata, the resume download, responsive overflow, reduced motion, sitemap, robots, and runtime console errors.

## Production build and local preview

```powershell
npm run build
npm start
```

The project preserves the generated `.openai/hosting.json` and OpenAI Sites / Cloudflare Worker-compatible Vite configuration. The production server uses `dist/server/wrangler.json` after a successful build.

## Environment configuration

Copy `.env.example` to `.env.local` for local configuration. Set:

```text
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
```

This public, non-secret origin is used for canonical, Open Graph, sitemap, and robots URLs. Do not place private keys or credentials in any `NEXT_PUBLIC_*` value.

## Contact-form delivery

No backend contact service or provider credentials were present in the source material. The form therefore validates the inquiry locally and opens the visitor's email application with a prepared message. It explicitly states that nothing is sent automatically and provides a copy fallback. To add server delivery later, connect a deployment-compatible form or email service on the server, keep credentials outside client code, add rate limiting and server-side validation, and update the privacy copy.

## Resume generation

The checked PDF is available at `public/resume/emmanuel-josh-velo-resume.pdf`. To rebuild it after updating verified resume data:

```powershell
python scripts/build_resume.py
```

Copy the rebuilt file from `output/pdf/` to the public resume path only after rendering and reviewing both pages.

## Deployment

No deployment is performed by this repository setup. To publish with the existing hosting configuration:

1. Set `NEXT_PUBLIC_SITE_URL` to the final trusted HTTPS origin.
2. Run every quality check and `npm run build`.
3. Run `npm start` and verify the local production worker.
4. Use the authorized OpenAI Sites hosting workflow or a compatible Cloudflare Worker deployment for `dist/server/wrangler.json`.
5. Recheck canonical metadata, social sharing, all external project links, the resume download, and the inquiry email handoff on the production domain.
