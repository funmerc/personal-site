import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import Projects from '../Projects.vue'

function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/projects', component: { template: '<div />' } },
      { path: '/projects/:slug', component: { template: '<div />' } },
    ],
  })
  const head = createHead()
  return mount(Projects, { global: { plugins: [router, head] } })
}

describe('Projects page', () => {
  it('renders the page title', () => {
    const w = mountPage()
    expect(w.find('h1').text()).toBe('Projects')
  })

  it('renders one card per published project', () => {
    const w = mountPage()
    const cards = w.findAll('a.entry-link')
    expect(cards.length).toBeGreaterThanOrEqual(1)
    expect(cards[0]?.attributes('href')).toMatch(/^\/projects\//)
  })

  it('renders tech chips from the project entry', () => {
    const w = mountPage()
    const chips = w.findAll('.chip')
    expect(chips.length).toBeGreaterThan(0)
  })
})
