import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { marked } from 'marked'

const SITE_URL = 'https://jasonrice.me'
const SITE_TITLE = 'Jason Rice — Notes'
const SITE_DESCRIPTION = 'Writing on engineering and building.'
const FEED_PATH = '/rss.xml'

// The API is the source of truth for content. process.env.VITE_API_BASE_URL
// lets CI/dev override; the workers.dev URL is the safe default.
const API_BASE =
  process.env.VITE_API_BASE_URL ??
  'https://personal-site-api.funmerc.workers.dev'

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(dateString) {
  return new Date(`${dateString}T00:00:00Z`).toUTCString()
}

async function fetchNotes() {
  const res = await fetch(`${API_BASE}/notes`)
  if (!res.ok) {
    throw new Error(`Failed to load /notes from ${API_BASE}: ${res.status}`)
  }
  return res.json()
}

export async function generateRssString() {
  // /notes is already filtered to published and sorted date desc by the API.
  const published = await fetchNotes()

  const latestDate = published[0]?.date
  const buildDate = latestDate ? rfc822(latestDate) : new Date().toUTCString()

  const items = published
    .map((n) => {
      const url = `${SITE_URL}/notes/${n.slug}`
      const bodyHtml = marked.parse(n.body, { gfm: true, breaks: false, async: false })
      return [
        '    <item>',
        `      <title>${escapeXml(n.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(n.date)}</pubDate>`,
        `      <description>${escapeXml(n.summary)}</description>`,
        `      <content:encoded><![CDATA[${bodyHtml}]]></content:encoded>`,
        '    </item>',
      ].join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(SITE_TITLE)}</title>`,
    `    <link>${SITE_URL}</link>`,
    `    <description>${escapeXml(SITE_DESCRIPTION)}</description>`,
    '    <language>en</language>',
    `    <lastBuildDate>${buildDate}</lastBuildDate>`,
    `    <atom:link href="${SITE_URL}${FEED_PATH}" rel="self" type="application/rss+xml" />`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}

export async function generateRss() {
  const xml = await generateRssString()
  const outPath = resolve('dist', 'rss.xml')
  writeFileSync(outPath, xml, 'utf-8')
  const count = (xml.match(/<item>/g) || []).length
  console.log(`Wrote ${outPath} (${count} item${count === 1 ? '' : 's'})`)
}
