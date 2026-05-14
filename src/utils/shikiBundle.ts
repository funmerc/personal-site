/**
 * The heavy Shiki bundle. Pulls in the themes, languages, and JS regex
 * engine we use (no wasm). Loaded only when a code block actually needs
 * highlighting, via the dynamic import in highlighter.ts.
 */
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'

import githubLight from 'shiki/themes/github-light.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'

import javascript from 'shiki/langs/javascript.mjs'
import typescript from 'shiki/langs/typescript.mjs'
import vue from 'shiki/langs/vue.mjs'
import css from 'shiki/langs/css.mjs'
import html from 'shiki/langs/html.mjs'
import shellscript from 'shiki/langs/shellscript.mjs'
import json from 'shiki/langs/json.mjs'
import python from 'shiki/langs/python.mjs'
import go from 'shiki/langs/go.mjs'
import rust from 'shiki/langs/rust.mjs'
import sql from 'shiki/langs/sql.mjs'
import markdown from 'shiki/langs/markdown.mjs'

const highlighter = createHighlighterCore({
  themes: [githubLight, githubDark],
  langs: [
    javascript,
    typescript,
    vue,
    css,
    html,
    shellscript,
    json,
    python,
    go,
    rust,
    sql,
    markdown,
  ],
  engine: createJavaScriptRegexEngine(),
})

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function highlight(code: string, lang: string): Promise<string> {
  const hl = await highlighter
  const loaded = hl.getLoadedLanguages() as readonly string[]
  const safeLang = lang && loaded.includes(lang) ? lang : 'text'
  try {
    return hl.codeToHtml(code, {
      lang: safeLang,
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    })
  } catch {
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}
