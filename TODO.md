# TODO

## Now

- [ ] **Compress hero images** — `src/assets/comic-hero.png` and `comic-hero-night.png` are ~2.7 MB each. Aim for <300 KB via WebP/AVIF or pngquant. Currently only the active-theme image loads, but it's still heavy for the landing page.
- [ ] Content data layer (TS for projects/demos, Markdown for notes) — needed to back the Home "featured projects" section (deferred from the initial hero pass).

## Next

- [ ] Home "featured projects" row — depends on data layer above
- [ ] First real Project entry + `ProjectDetail` layout
- [ ] `:focus-visible` styles on links and buttons
- [ ] Comic 404 using the `action-text` utility
- [ ] Footer link expansion (LinkedIn, email, RSS)
- [ ] Uses page content

## Later

- [ ] Per-route detail meta derived from data layer (replaces current placeholders in `*Detail.vue`)
- [ ] Code highlighting in Notes (Shiki)
- [ ] RSS feed for Notes
- [ ] Skip-to-content link + verify `prefers-reduced-motion` disables the page slide
- [ ] Lightweight analytics (Plausible / Umami)
- [ ] Responsive image component (`<picture>` with AVIF/WebP, lazy-loaded)
