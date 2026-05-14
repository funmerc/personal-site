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
