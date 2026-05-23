// Thin HTTP client for the personal-site API. All endpoints are unauthenticated
// GETs that return JSON. Lists come pre-filtered to published and sorted by
// date desc, so no client-side sorting or filtering is needed.

export type Status = 'draft' | 'published'

export interface BaseEntry {
  slug: string
  title: string
  summary: string
  date: string
  status: Status
  tags?: string[]
}

export interface Project extends BaseEntry {
  tech: string[]
  role?: 'solo' | 'lead' | 'contributor'
  period?: string
  cover?: string
  featured?: boolean
  body?: string
  links?: {
    live?: string
    repo?: string
    demo?: string
  }
}

export interface Demo extends BaseEntry {
  tech: string[]
  cover?: string
  body?: string
  embed?: string
  links?: {
    live?: string
    repo?: string
  }
}

export interface Note extends BaseEntry {
  body: string
  readingMinutes?: number
}

export type RecentItem =
  | (Project & { kind: 'projects' })
  | (Demo & { kind: 'demos' })
  | (Note & { kind: 'notes' })

export interface AboutResponse {
  interests: string[]
  goals: string[]
  why: string
}

export interface StatusResponse {
  currently: string
  next: string
  future: string
}

export interface EducationItem {
  name: string
  graduation_date: string
  degree_title: string
  relevant_coursework: string[]
}

export interface EducationResponse {
  items: EducationItem[]
}

export interface WorkSection {
  label: string
  values: string[]
}

export interface WorkRole {
  companyTitle: string
  workDateRange: string
  jobTitle: string
  jobLocation: string
  sections: WorkSection[]
}

export interface UsesSection {
  label: string
  items: string[]
}

export interface UsesResponse {
  sections: UsesSection[]
}

const BASE = import.meta.env.VITE_API_BASE_URL as string

async function api<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`${res.status} ${path}`)
  return (await res.json()) as T
}

// 404s come back as ok=false; map them to undefined so callers can show
// a not-found state without try/catch ceremony.
async function apiOptional<T>(path: string): Promise<T | undefined> {
  const res = await fetch(`${BASE}${path}`)
  if (res.status === 404) return undefined
  if (!res.ok) throw new Error(`${res.status} ${path}`)
  return (await res.json()) as T
}

export const getProjects = () => api<Project[]>('/projects')
export const getProject = (slug: string) =>
  apiOptional<Project>(`/projects/${slug}`)

export const getDemos = () => api<Demo[]>('/demos')
export const getDemo = (slug: string) => apiOptional<Demo>(`/demos/${slug}`)

export const getNotes = () => api<Note[]>('/notes')
export const getNote = (slug: string) => apiOptional<Note>(`/notes/${slug}`)

export const getRecent = (limit = 5) =>
  api<RecentItem[]>(`/recent?limit=${limit}`)

export const getAbout = () => api<AboutResponse>('/about')
export const getStatus = () => api<StatusResponse>('/status')
export const getEducation = () => api<EducationResponse>('/education')
export const getWork = () => api<WorkRole[]>('/work')
export const getUses = () => api<UsesResponse>('/uses')
