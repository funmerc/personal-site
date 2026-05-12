import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import Notes from '../Notes.vue'

function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/notes', component: { template: '<div />' } },
      { path: '/notes/:slug', component: { template: '<div />' } },
    ],
  })
  const head = createHead()
  return mount(Notes, { global: { plugins: [router, head] } })
}

describe('Notes page', () => {
  it('mounts and renders the page title', () => {
    const w = mountPage()
    expect(w.find('h1').text()).toBe('Notes')
  })

  it('renders an EntryCard link for each published note', () => {
    const w = mountPage()
    const cards = w.findAll('a.entry-link')
    expect(cards.length).toBeGreaterThanOrEqual(1)
    expect(cards[0]?.attributes('href')).toMatch(/^\/notes\//)
  })
})
