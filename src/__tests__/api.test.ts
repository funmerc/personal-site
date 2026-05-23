import { describe, it, expect } from 'vitest'
import {
  getProjects,
  getProject,
  getDemos,
  getDemo,
  getNotes,
  getNote,
  getRecent,
  getAbout,
  getStatus,
  getEducation,
  getWork,
  getUses,
} from '../api'
import {
  projectsFixture,
  demosFixture,
  notesFixture,
} from '../test/api-fixtures'

describe('api client', () => {
  it('getProjects returns the fixture list as-is (pre-sorted by the server)', async () => {
    const projects = await getProjects()
    expect(projects.map((p) => p.slug)).toEqual(
      projectsFixture.map((p) => p.slug),
    )
  })

  it('getProject returns a project for a known slug', async () => {
    const p = await getProject(projectsFixture[0]!.slug)
    expect(p?.title).toBe(projectsFixture[0]!.title)
  })

  it('getProject returns undefined on 404', async () => {
    const p = await getProject('does-not-exist')
    expect(p).toBeUndefined()
  })

  it('getDemos / getDemo round-trip', async () => {
    const list = await getDemos()
    expect(list[0]?.slug).toBe(demosFixture[0]!.slug)
    const single = await getDemo(demosFixture[0]!.slug)
    expect(single?.title).toBe(demosFixture[0]!.title)
    expect(await getDemo('nope')).toBeUndefined()
  })

  it('getNotes / getNote round-trip', async () => {
    const list = await getNotes()
    expect(list[0]?.slug).toBe(notesFixture[0]!.slug)
    expect((await getNote(notesFixture[0]!.slug))?.title).toBe(
      notesFixture[0]!.title,
    )
    expect(await getNote('nope')).toBeUndefined()
  })

  it('getRecent respects the limit and tags items with kind', async () => {
    const recent = await getRecent(2)
    expect(recent.length).toBeLessThanOrEqual(2)
    for (const item of recent) {
      expect(['projects', 'demos', 'notes']).toContain(item.kind)
    }
  })

  it('singletons (about, status, education, work, uses) all resolve', async () => {
    const [about, status, education, work, uses] = await Promise.all([
      getAbout(),
      getStatus(),
      getEducation(),
      getWork(),
      getUses(),
    ])
    expect(about.why.length).toBeGreaterThan(0)
    expect(status.currently.length).toBeGreaterThan(0)
    expect(education.items.length).toBeGreaterThan(0)
    expect(work.length).toBeGreaterThan(0)
    expect(uses.sections.length).toBeGreaterThan(0)
  })
})
