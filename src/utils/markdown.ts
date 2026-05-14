import { marked, type Tokens } from 'marked'
import { highlight } from './highlighter'

marked.setOptions({
  gfm: true,
  breaks: false,
  async: true,
})

// The link renderer is overridden so absolute URLs open in a new tab.
// Internal links (starting with `/`) are left as plain anchors, and
// useProseLinks intercepts the clicks so Vue Router handles routing.
//
// Code blocks are highlighted with Shiki. Highlighting is async, so it runs
// inside walkTokens (which marked awaits) and the sync code renderer just
// returns the pre-rendered HTML stashed on the token.
type HighlightedCode = Tokens.Code & { highlighted?: string }

marked.use({
  async: true,
  walkTokens: async (token) => {
    if (token.type === 'code') {
      const codeToken = token as HighlightedCode
      codeToken.highlighted = await highlight(
        codeToken.text,
        codeToken.lang ?? '',
      )
    }
  },
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const isExternal = /^https?:\/\//i.test(href)
      const externalAttrs = isExternal ? ' target="_blank" rel="noopener"' : ''
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}"${titleAttr}${externalAttrs}>${text}</a>`
    },
    code(token) {
      return (token as HighlightedCode).highlighted ?? ''
    },
  },
})

/**
 * Render a markdown source string to HTML. Content is author controlled
 * (loaded from our own JSON files), so no sanitizer is applied. If that
 * assumption ever changes, run the output through DOMPurify before
 * injection.
 *
 * Async because Shiki (used for fenced code highlighting) loads lazily.
 */
export async function renderMarkdown(source: string): Promise<string> {
  return (await marked.parse(source, { async: true })) as string
}
