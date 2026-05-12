# jasonrice.me

My personal site. Working in public portfolio with projects, demos, and writing. Comic theme by design, the site is a playground.

Live at [jasonrice.me](https://jasonrice.me).

## Stack

* Vue 3 + TypeScript + Vite
* Tailwind 4 using the `@theme` directive so there's no Tailwind config file to maintain
* Vue Router
* marked for markdown rendering, Shiki for syntax highlighting on fenced code blocks (lazy loaded, dual light and dark themes)
* vite-imagetools + sharp for responsive AVIF, WebP, and JPEG variants of every hero image
* @unhead/vue for per route head and meta tags
* Vitest + @vue/test-utils for the test suite
* Deployed to GitHub Pages

## Project layout

```
src/
  components/    Reusable pieces (ComicPanel, EntryCard, Loader, ResponsiveImage, IndexLayout, SiteNav, SiteFooter)
  composables/   useTheme, useNavMenu, useNavDirection, useRouteMeta, useProseLinks
  content/       List content as typed JSON (projects, demos, notes)
  data/          Singleton content (about, education, work history, uses, home status)
  pages/         One file per route
  router/        Route table
  utils/         formatDate, markdown pipeline, Shiki bundle, logger
  style.css      Tailwind import, design tokens, global utilities, prose styles
scripts/         Postbuild tasks (404 copy, RSS generation)
public/          Static files served as is (favicon, OG image)
```

## Content

All content is JSON, no CMS. Edit a file, save, the dev server reloads.

* **Projects** at `src/content/projects.json`. Each entry has `slug`, `title`, `summary`, `date`, `status` (draft or published), `tech`, optional `body` (markdown), `links`, and so on.
* **Demos** at `src/content/demos.json`. Same shape as projects.
* **Notes** at `src/content/notes.json`. Required `body` field, written as markdown.
* **Home status box** at `src/data/status.json`. Three rows: `currently`, `next`, `future`.
* **About** at `src/data/about.json`, **education** at `src/data/education.json`, **work history** at `src/data/work_experience.json`, **Uses** at `src/data/uses.json`.

Markdown bodies render with syntax highlighting on fenced code blocks. The bundled language set covers JavaScript, TypeScript, Vue, CSS, HTML, JSON, Bash, Python, Go, Rust, SQL, and Markdown. Unknown languages fall back to plain text.

The home page shows the two most recent items across projects, demos, and notes (whichever published items have the newest dates). Drafts are filtered out automatically. Adjust the count in `src/pages/Home.vue` by changing the `getRecent(2)` call.

## Theme

Light by default, dark via `data-theme="dark"` on the `<html>` element (toggled from the footer, persisted to `localStorage`). System preference acts as the fallback when no manual choice has been made. Both themes are exposed as CSS variables in `src/style.css` under the `@theme` block.

## RSS

The notes feed lives at `/rss.xml`. Built once on every production build by `scripts/generate-rss.js` and served on the fly in dev through a small plugin in `vite.config.ts` so you don't have to rebuild to test it. The site advertises the feed with a `<link rel="alternate" type="application/rss+xml">` in `index.html` so RSS readers can auto discover it.

## Commands

```
npm run dev          # Vite dev server, RSS feed served from middleware
npm run build        # type check + production build + postbuild tasks
npm run preview      # preview the production build locally
npm run test         # Vitest in watch mode
npm run test:run     # one shot test run for CI
npm run lint         # ESLint with autofix
npm run lint:check   # ESLint without autofix
npm run format       # Prettier write
npm run format:check # Prettier check
```

## Tests

86 tests across components, pages, composables, utils, and content helpers. Pages with hero images mount under Vitest thanks to a small `vite.config.ts` style plugin that stubs out `?as=picture` imports for the test environment (see `src/test/picture-stub.ts`).

## Accessibility

Skip to content link as the first focusable element. `prefers-reduced-motion` is respected globally, so the page transition flattens and other transitions effectively disable themselves. Alt text on the responsive images, aria attributes on the menu and indicators.

## Deployment

Push to `main`. GitHub Actions builds and deploys to GitHub Pages. See `.github/workflows/deploy.yml`. The `dist/404.html` copy is created in the postbuild step so client side routes resolve correctly on Pages.

## License

See `LICENSE`.
