// In-memory fixtures + a fetch shim that stand in for the live API during
// tests. The shape matches the API brief (already-filtered, already-sorted).
import type {
  Project,
  Demo,
  Note,
  RecentItem,
  AboutResponse,
  StatusResponse,
  EducationResponse,
  WorkRole,
  UsesResponse,
} from '../api'

export const projectsFixture: Project[] = [
  {
    slug: 'labs',
    title: 'Labs',
    summary: 'A growing playground of small interactive demos.',
    date: '2026-05-14',
    status: 'published',
    featured: true,
    tech: ['TypeScript', 'HTML', 'CSS', 'Vite'],
    role: 'solo',
    period: '2026',
    tags: ['demos', 'experiments'],
    body: 'Labs is where I prototype the stuff I want to understand.',
    links: {
      live: 'https://funmerc.github.io/labs/',
      repo: 'https://github.com/funmerc/labs',
    },
  },
  {
    slug: 'this-site',
    title: 'This site',
    summary: 'Working-in-public portfolio.',
    date: '2026-05-11',
    status: 'published',
    featured: true,
    tech: ['Vue 3', 'TypeScript', 'Vite'],
    role: 'solo',
    period: '2026',
    tags: ['portfolio'],
    body: 'This is my site.',
    links: {
      live: 'https://jasonrice.me',
      repo: 'https://github.com/funmerc/personal-site',
    },
  },
]

export const demosFixture: Demo[] = [
  {
    slug: 'ai-tokenizer',
    title: 'AI tokenizer demo',
    summary: 'A tiny playground for seeing how text gets chopped into tokens.',
    date: '2026-05-17',
    status: 'published',
    tech: ['JavaScript', 'HTML'],
    tags: ['ai', 'tokenizer'],
    body: 'A little demo for poking at how text turns into tokens.',
    embed: 'https://funmerc.github.io/labs/ai/tokenizer/',
    links: {
      live: 'https://funmerc.github.io/labs/ai/tokenizer/',
      repo: 'https://github.com/funmerc/labs',
    },
  },
]

export const notesFixture: Note[] = [
  {
    slug: 'ai-as-a-tool',
    title: 'AI as a tool',
    summary: 'AI codes well, but it is a hyper-focused lens.',
    date: '2026-05-11',
    status: 'published',
    body: 'AI is honestly a great tool.',
  },
]

export const aboutFixture: AboutResponse = {
  interests: ['Programming', 'Keyboards'],
  goals: ['Make an impact', 'Help others succeed'],
  why: 'I grew up around computers.',
}

export const statusFixture: StatusResponse = {
  currently: 'researching and adding AI demos.',
  next: 'looking into e-commerce platforms.',
  future: 'researching and building an MCP.',
}

export const educationFixture: EducationResponse = {
  items: [
    {
      name: 'Arizona State University',
      graduation_date: 'May 2018',
      degree_title: 'Master of Science in Software Engineering',
      relevant_coursework: ['Advanced Data Structures and Algorithms'],
    },
  ],
}

export const workFixture: WorkRole[] = [
  {
    companyTitle: 'Dr First',
    workDateRange: 'Jan 2024 - Mar 2026',
    jobTitle: 'Senior Software Engineer',
    jobLocation: 'Remote',
    sections: [
      { label: 'Key Technologies', values: ['Frontend/Backend stacks'] },
      { label: 'Responsibilities', values: ['Main engineer.'] },
    ],
  },
]

export const usesFixture: UsesResponse = {
  sections: [
    { label: 'Hardware', items: ['Mac', 'Windows PC'] },
    { label: 'Software', items: ['VS Code', 'IntelliJ'] },
    { label: 'Desk', items: ['Mesh chair'] },
  ],
}

export function recentFixture(limit = 5): RecentItem[] {
  const all: RecentItem[] = [
    ...projectsFixture.map((p) => ({ ...p, kind: 'projects' as const })),
    ...demosFixture.map((d) => ({ ...d, kind: 'demos' as const })),
    ...notesFixture.map((n) => ({ ...n, kind: 'notes' as const })),
  ]
  return all
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
}

function makeRes(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function notFound(): Response {
  return makeRes({ error: 'not found' }, 404)
}

// Routes path + search to the right fixture. Anything unrecognised 404s so
// callers see the same shape as the real API.
function route(pathname: string, search: URLSearchParams): Response {
  if (pathname === '/') return makeRes({ ok: true })
  if (pathname === '/projects') return makeRes(projectsFixture)
  if (pathname === '/demos') return makeRes(demosFixture)
  if (pathname === '/notes') return makeRes(notesFixture)
  if (pathname === '/about') return makeRes(aboutFixture)
  if (pathname === '/status') return makeRes(statusFixture)
  if (pathname === '/education') return makeRes(educationFixture)
  if (pathname === '/work') return makeRes(workFixture)
  if (pathname === '/uses') return makeRes(usesFixture)
  if (pathname === '/recent') {
    const limit = Number(search.get('limit') ?? '5')
    return makeRes(recentFixture(Number.isFinite(limit) ? limit : 5))
  }

  const projMatch = /^\/projects\/(.+)$/.exec(pathname)
  if (projMatch) {
    const slug = decodeURIComponent(projMatch[1]!)
    const found = projectsFixture.find((p) => p.slug === slug)
    return found ? makeRes(found) : notFound()
  }
  const demoMatch = /^\/demos\/(.+)$/.exec(pathname)
  if (demoMatch) {
    const slug = decodeURIComponent(demoMatch[1]!)
    const found = demosFixture.find((d) => d.slug === slug)
    return found ? makeRes(found) : notFound()
  }
  const noteMatch = /^\/notes\/(.+)$/.exec(pathname)
  if (noteMatch) {
    const slug = decodeURIComponent(noteMatch[1]!)
    const found = notesFixture.find((n) => n.slug === slug)
    return found ? makeRes(found) : notFound()
  }
  return notFound()
}

export function installFetchMock(): void {
  const handler = async (input: RequestInfo | URL): Promise<Response> => {
    const raw =
      typeof input === 'string'
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url
    const u = new URL(raw)
    return route(u.pathname, u.searchParams)
  }
  globalThis.fetch = handler as typeof fetch
}
