import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import NoteDetail from '../NoteDetail.vue'
import { getNotes } from '../../content'

async function mountAt(slug: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/notes', component: { template: '<div />' } },
      { path: '/notes/:slug', component: NoteDetail, name: 'note-detail' },
    ],
  })
  await router.push(`/notes/${slug}`)
  await router.isReady()
  const head = createHead()
  const wrapper = mount(NoteDetail, { global: { plugins: [router, head] } })
  return wrapper
}

describe('NoteDetail page', () => {
  it('renders the note title for an existing slug', async () => {
    const note = getNotes()[0]
    expect(note).toBeDefined()
    const w = await mountAt(note!.slug)
    expect(w.find('h1').text()).toBe(note!.title)
  })

  it('renders a back link to /notes for an existing note', async () => {
    const note = getNotes()[0]
    const w = await mountAt(note!.slug)
    expect(w.find('a.back-tab').attributes('href')).toBe('/notes')
  })

  it('renders the not-found state for an unknown slug', async () => {
    const w = await mountAt('nope-not-real')
    await flushPromises()
    expect(w.find('h1').text()).toBe('Not found')
    expect(w.find('a.inline-back').attributes('href')).toBe('/notes')
  })
})
