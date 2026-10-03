# Emmanuel Josh Velo - Portfolio

A professional, responsive portfolio for Emmanuel Josh Velo, presenting verified work as a Web Developer and Software Engineer in the Philippines.

## Included

- Sticky desktop and mobile navigation with active-section state
- Responsive hero, about, selected projects, technical skills, contact, and footer sections
- Seven evidence-based case studies, including Alumni Gallery and the current Alder & Tide booking project
- Local technology logos with readable names and repository evidence, matching the freelance portfolio
- Desktop orbital project explorer with a conventional responsive grid fallback
- Accessible project-detail dialog and keyboard-friendly project controls
- Direct email and professional contact links
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

## Syncing freelance portfolio updates

Contact URLs live in `lib/portfolio-data.ts`. WhatsApp and Viber use the number already published in the freelance portfolio. Set `identity.instagram` to your verified Instagram profile URL to show its link in Contact and the footer; until then it stays hidden rather than pointing to a guessed account.

The corporate portfolio keeps its own recruiter-focused writing, navigation, contact links, and resume. It does not copy freelance pricing, services, or client testimonials.

With the freelance `Portfolio` folder beside this repository, run:

```powershell
npm run sync:portfolio
npm run sync:check
```

The sync imports the Alumni Gallery and Alder & Tide names, demo links, optimized screenshots, and technology groups from the freelance homepage into `lib/freelance-snapshot.json`. It copies the SVG logos and their Devicon license locally, so the deployed site needs no icon CDN or access to the other folder. A different source folder can be provided with `npm run sync:portfolio -- "C:\path\to\Portfolio"`.

Review the resulting Git diff before committing. The script fails if the expected HTML structure changes; it never modifies the freelance portfolio or deploys either site. It refreshes these two tracked projects and technology groups, but does not automatically discover new projects or rewrite technical claims. Add new case studies and review changed project responsibilities, stacks, test results, and production limits in `lib/portfolio-data.ts` when the underlying apps change. Alder & Tide replaces the earlier BookSync entry because both refer to the same booking repository and live URL.

Verified sources: `Portfolio/index.html`, its Alumni and Alder detail pages, and the local Alumni Gallery, Booking System, and Vertex Legacy manifests/documentation. Newer Next.js, NestJS, PostgreSQL, and Prisma skills are supported by Vertex Legacy; they link directly to its repository without copying financial or client claims into this portfolio.

## Quality checks

```powershell
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
npm run build:pages
```

The browser suite uses an installed Google Chrome through Playwright's `chrome` channel. It starts a Next.js preview on port 3100 (override with `PORTFOLIO_TEST_PORT`) to test the GitHub Pages rendering stack without using another app on port 3000 or conflicting with a running Vinext preview. It covers desktop and mobile navigation, project filtering and details, contact links, technology logos, metadata, the resume download, responsive overflow, reduced motion, sitemap, robots, and runtime console errors.

Type checking regenerates Next.js route definitions first, avoiding stale generated type errors when switching between Vinext development and Next.js Pages builds.

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
NEXT_PUBLIC_BASE_PATH=/repository-name
```

`NEXT_PUBLIC_SITE_URL` supplies the canonical production URL. `NEXT_PUBLIC_BASE_PATH` prefixes public assets when the portfolio is hosted below a repository path, such as `/emmanuel-velo-portfolio` on GitHub Pages. Both values are public; do not place private keys or credentials in any `NEXT_PUBLIC_*` value.

## Resume generation

The checked PDF is available at `public/resume/emmanuel-josh-velo-resume.pdf`. To rebuild it after updating verified resume data:

```powershell
python scripts/build_resume.py
```

Copy the rebuilt file from `output/pdf/` to the public resume path only after rendering and reviewing both pages.

## GitHub Pages deployment

The workflow at `.github/workflows/build-and-deploy.yml` deploys the portfolio when `master` is updated or when it is started manually from the Actions tab. It:

1. Installs the locked dependencies with Node.js 22.
2. Runs linting, TypeScript checks, and unit tests.
3. Builds a static Next.js export in `out/` with the repository base path.
4. Adds `.nojekyll`, uploads the Pages artifact, and deploys it through GitHub Pages.

In the repository’s **Settings → Pages**, keep **Source** set to **GitHub Actions**. Commit and push the workflow and configuration changes to `master`; the published site will be available at `https://progjosh.github.io/emmanuel-velo-portfolio/` after the action succeeds.

The Vinext/OpenAI Sites build remains available through `npm run build` and `npm start`. GitHub Pages specifically uses `npm run build:pages` because Pages can host static files but cannot run the Cloudflare Worker output.
