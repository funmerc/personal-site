import { describe, it, expect } from 'vitest'
import { renderMarkdown } from '../markdown'

describe('renderMarkdown', () => {
  it('renders basic markdown to HTML', async () => {
    const html = await renderMarkdown('# Hello\n\nWorld')
    expect(html).toContain('<h1>Hello</h1>')
    expect(html).toContain('<p>World</p>')
  })

  it('opens absolute URLs in a new tab', async () => {
    const html = await renderMarkdown('[link](https://example.com)')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener"')
  })

  it('leaves internal links without target=_blank', async () => {
    const html = await renderMarkdown('[notes](/notes)')
    expect(html).toContain('href="/notes"')
    expect(html).not.toContain('target="_blank"')
  })

  it('passes fenced code blocks through Shiki', async () => {
    const md = '```ts\nconst x: number = 1\n```'
    const html = await renderMarkdown(md)
    expect(html).toContain('class="shiki')
    expect(html).toContain('--shiki-light')
    expect(html).toContain('--shiki-dark')
  }, 15_000)

  it('falls back to a plain pre/code for unknown languages', async () => {
    const md = '```not-a-real-lang\nplain text\n```'
    const html = await renderMarkdown(md)
    expect(html).toContain('plain text')
  }, 15_000)
})
