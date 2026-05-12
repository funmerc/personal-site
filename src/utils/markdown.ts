import { marked } from 'marked'

marked.setOptions({
  gfm: true,
  breaks: false,
})

/**
 * Render a markdown source string to HTML. Content is author-controlled
 * (loaded from our own JSON files), so no sanitizer is applied — if that
 * assumption ever changes, run the output through DOMPurify before injection.
 */
export function renderMarkdown(md: string): string {
  return marked.parse(md) as string
}
