import { useHead } from '@unhead/vue'

// Per-page <head> shorthand. Sets title (the App-level titleTemplate wraps
// it as "Title · Jason Rice"), description, and matching OG/Twitter tags.
export function useRouteMeta(opts: {
  title: string
  description: string
  noindex?: boolean
}) {
  const fullTitle = `${opts.title} · Jason Rice`
  useHead({
    title: opts.title,
    meta: [
      { name: 'description', content: opts.description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: opts.description },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: opts.description },
      ...(opts.noindex ? [{ name: 'robots', content: 'noindex' }] : []),
    ],
  })
}
