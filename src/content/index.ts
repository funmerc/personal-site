import projectsData from './projects.json'
import demosData from './demos.json'
import notesData from './notes.json'
import type { Demo, Note, Project } from './types'

const projects = projectsData as Project[]
const demos = demosData as Demo[]
const notes = notesData as Note[]

function published<T extends { status: string }>(items: T[]): T[] {
  return items.filter((entry) => entry.status === 'published')
}

function byDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((first, second) =>
    second.date.localeCompare(first.date),
  )
}

export type RecentItem =
  | (Project & { kind: 'projects' })
  | (Demo & { kind: 'demos' })
  | (Note & { kind: 'notes' })

export function getProjects(): Project[] {
  return byDateDesc(published(projects))
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug)
}

export function getDemos(): Demo[] {
  return byDateDesc(published(demos))
}

export function getDemo(slug: string): Demo | undefined {
  return getDemos().find((demo) => demo.slug === slug)
}

export function getNotes(): Note[] {
  return byDateDesc(published(notes))
}

export function getNote(slug: string): Note | undefined {
  return getNotes().find((note) => note.slug === slug)
}

/**
 * The most recent N items across projects, demos, and notes. Each one is
 * tagged with its `kind` so the caller can route to the right detail page.
 */
export function getRecent(limit = 5): RecentItem[] {
  const all: RecentItem[] = [
    ...getProjects().map((project) => ({
      ...project,
      kind: 'projects' as const,
    })),
    ...getDemos().map((demo) => ({ ...demo, kind: 'demos' as const })),
    ...getNotes().map((note) => ({ ...note, kind: 'notes' as const })),
  ]
  return byDateDesc(all).slice(0, limit)
}
