import { marked } from 'marked'

marked.setOptions({
  gfm: true,
  breaks: false,
})

// Override the link renderer so absolute URLs open in a new tab. Internal
// links (starting with `/`) are left as plain anchors — useProseLinks handles
// routing them through Vue Router at click time.
marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const isExternal = /^https?:\/\//i.test(href)
      const externalAttrs = isExternal ? ' target="_blank" rel="noopener"' : ''
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}"${titleAttr}${externalAttrs}>${text}</a>`
    },
  },
})

/**
 * Render a markdown source string to HTML. Content is author-controlled
 * (loaded from our own JSON files), so no sanitizer is applied — if that
 * assumption ever changes, run the output through DOMPurify before injection.
 */
export function renderMarkdown(md: string): string {
  return marked.parse(md) as string
}
