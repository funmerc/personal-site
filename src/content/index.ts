import projectsData from './projects.json'
import demosData from './demos.json'
import notesData from './notes.json'
import type { Demo, Note, Project } from './types'

const projects = projectsData as Project[]
const demos = demosData as Demo[]
const notes = notesData as Note[]

function published<T extends { status: string }>(xs: T[]): T[] {
  return xs.filter((x) => x.status === 'published')
}

function byDateDesc<T extends { date: string }>(xs: T[]): T[] {
  return [...xs].sort((a, b) => b.date.localeCompare(a.date))
}

export type RecentItem =
  | (Project & { kind: 'projects' })
  | (Demo & { kind: 'demos' })
  | (Note & { kind: 'notes' })

export function getProjects(): Project[] {
  return byDateDesc(published(projects))
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug)
}

export function getDemos(): Demo[] {
  return byDateDesc(published(demos))
}

export function getDemo(slug: string): Demo | undefined {
  return getDemos().find((d) => d.slug === slug)
}

export function getNotes(): Note[] {
  return byDateDesc(published(notes))
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((n) => n.slug === slug)
}

/**
 * The most recent N items across projects, demos, and notes — each tagged
 * with its `kind` so the caller can route to the right detail page.
 */
export function getRecent(limit = 5): RecentItem[] {
  const all: RecentItem[] = [
    ...getProjects().map((p) => ({ ...p, kind: 'projects' as const })),
    ...getDemos().map((d) => ({ ...d, kind: 'demos' as const })),
    ...getNotes().map((n) => ({ ...n, kind: 'notes' as const })),
  ]
  return byDateDesc(all).slice(0, limit)
}
