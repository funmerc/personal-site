import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import Projects from '../Projects.vue'

async function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/projects', component: { template: '<div />' } },
      { path: '/projects/:slug', component: { template: '<div />' } },
    ],
  })
  const head = createHead()
  const wrapper = mount(Projects, { global: { plugins: [router, head] } })
  await flushPromises()
  return wrapper
}

describe('Projects page', () => {
  it('renders the page title', async () => {
    const w = await mountPage()
    expect(w.find('h1').text()).toBe('Projects')
  })

  it('renders one card per published project', async () => {
    const w = await mountPage()
    const cards = w.findAll('a.entry-link')
    expect(cards.length).toBeGreaterThanOrEqual(1)
    expect(cards[0]?.attributes('href')).toMatch(/^\/projects\//)
  })

  it('renders tech chips from the project entry', async () => {
    const w = await mountPage()
    const chips = w.findAll('.chip')
    expect(chips.length).toBeGreaterThan(0)
  })
})
