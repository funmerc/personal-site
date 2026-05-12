import { toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'

// Per-page <head> shorthand. Sets title (the App-level titleTemplate wraps
// it as "Title · Jason Rice"), description, and matching OG/Twitter tags.
// Accepts plain strings or reactive sources (refs/getters) so detail pages
// can derive meta from a looked-up entry.
export function useRouteMeta(opts: {
  title: MaybeRefOrGetter<string>
  description: MaybeRefOrGetter<string>
  noindex?: boolean
}) {
  const title = () => toValue(opts.title)
  const description = () => toValue(opts.description)
  const fullTitle = () => `${title()} · Jason Rice`

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      ...(opts.noindex ? [{ name: 'robots', content: 'noindex' }] : []),
    ],
  })
}
