import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the JSON modules. Each test file gets the mocked content. Use the
// default export shape so the real module's default-import contracts hold.
vi.mock('../projects.json', () => ({
  default: [
    {
      slug: 'old',
      title: 'Old',
      summary: 's',
      date: '2025-01-01',
      status: 'published',
      tech: [],
      featured: false,
    },
    {
      slug: 'new',
      title: 'New',
      summary: 's',
      date: '2026-03-01',
      status: 'published',
      tech: [],
      featured: true,
    },
    {
      slug: 'draft',
      title: 'Draft',
      summary: 's',
      date: '2027-01-01',
      status: 'draft',
      tech: [],
      featured: true,
    },
  ],
}))

vi.mock('../demos.json', () => ({
  default: [
    {
      slug: 'd1',
      title: 'D1',
      summary: 's',
      date: '2026-02-01',
      status: 'published',
      tech: [],
    },
  ],
}))

vi.mock('../notes.json', () => ({
  default: [
    {
      slug: 'n1',
      title: 'N1',
      summary: 's',
      date: '2026-04-01',
      status: 'published',
      body: 'body',
    },
    {
      slug: 'n2',
      title: 'N2',
      summary: 's',
      date: '2026-05-01',
      status: 'published',
      body: 'body',
    },
  ],
}))

import {
  getProjects,
  getProject,
  getDemos,
  getDemo,
  getNotes,
  getNote,
  getRecent,
} from '../index'

describe('content/index', () => {
  beforeEach(() => {
    // No shared state to reset; mocks are static.
  })

  describe('getProjects', () => {
    it('filters out drafts', () => {
      const p = getProjects()
      expect(p.find((x) => x.slug === 'draft')).toBeUndefined()
    })

    it('sorts published projects newest-first', () => {
      const p = getProjects()
      expect(p.map((x) => x.slug)).toEqual(['new', 'old'])
    })
  })

  describe('getProject', () => {
    it('finds a project by slug', () => {
      expect(getProject('new')?.title).toBe('New')
    })

    it('returns undefined for an unknown slug', () => {
      expect(getProject('missing')).toBeUndefined()
    })

    it('does not return drafts', () => {
      expect(getProject('draft')).toBeUndefined()
    })
  })

  describe('getDemos and getDemo', () => {
    it('returns published demos sorted desc', () => {
      const d = getDemos()
      expect(d).toHaveLength(1)
      expect(d[0]?.slug).toBe('d1')
    })

    it('finds a demo by slug', () => {
      expect(getDemo('d1')?.title).toBe('D1')
      expect(getDemo('nope')).toBeUndefined()
    })
  })

  describe('getNotes and getNote', () => {
    it('returns notes sorted desc by date', () => {
      const n = getNotes()
      expect(n.map((x) => x.slug)).toEqual(['n2', 'n1'])
    })

    it('finds a note by slug', () => {
      expect(getNote('n1')?.title).toBe('N1')
      expect(getNote('missing')).toBeUndefined()
    })
  })

  describe('getRecent', () => {
    it('merges projects/demos/notes and sorts desc by date', () => {
      const r = getRecent(10)
      // Date order across mocks: n2(2026-05-01), n1(2026-04-01),
      // new(2026-03-01), d1(2026-02-01), old(2025-01-01).
      // Drafts excluded.
      expect(r.map((x) => x.slug)).toEqual(['n2', 'n1', 'new', 'd1', 'old'])
    })

    it('tags each item with its kind for routing', () => {
      const r = getRecent(10)
      const kinds = Object.fromEntries(r.map((x) => [x.slug, x.kind]))
      expect(kinds.new).toBe('projects')
      expect(kinds.d1).toBe('demos')
      expect(kinds.n1).toBe('notes')
    })

    it('limits the result to the given count', () => {
      expect(getRecent(2)).toHaveLength(2)
      expect(getRecent(2).map((x) => x.slug)).toEqual(['n2', 'n1'])
    })

    it('defaults limit to 5', () => {
      // 5 published items in mocks, all included.
      expect(getRecent()).toHaveLength(5)
    })
  })
})
