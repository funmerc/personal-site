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

export function getProjects(): Project[] {
  return byDateDesc(published(projects))
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured)
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
