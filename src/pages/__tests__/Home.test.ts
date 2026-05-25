import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import Home from '../Home.vue'

async function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' } },
      { path: '/about', component: { template: '<div />' } },
      { path: '/projects', component: { template: '<div />' } },
      { path: '/projects/:slug', component: { template: '<div />' } },
      { path: '/demos/:slug', component: { template: '<div />' } },
      { path: '/notes/:slug', component: { template: '<div />' } },
    ],
  })
  const head = createHead()
  const wrapper = mount(Home, { global: { plugins: [router, head] } })
  // Let the async onMounted resolve and the DOM update.
  await flushPromises()
  return wrapper
}

describe('Home page', () => {
  it('renders the wordmark h1', async () => {
    const w = await mountPage()
    expect(w.find('h1.name').text()).toBe('Jason Rice')
  })

  it('renders the tagline', async () => {
    const w = await mountPage()
    expect(w.find('.tagline').text()).toContain('Building products')
  })

  it('renders the status box with Currently / Next / Future rows', async () => {
    const w = await mountPage()
    const labels = w.findAll('.status-label').map((n) => n.text())
    expect(labels).toEqual(['Currently', 'Next', 'Future'])
    for (const t of w.findAll('.status-text')) {
      expect(t.text().length).toBeGreaterThan(0)
    }
  })

  it('renders the hero via ResponsiveImage with picture+img', async () => {
    const w = await mountPage()
    expect(w.find('.cell-art picture').exists()).toBe(true)
    expect(w.find('.cell-art img').attributes('src')).toBe('/stub.jpeg')
  })

  it('renders the Recent section with cards from across content kinds', async () => {
    const w = await mountPage()
    expect(w.find('.section-title').text()).toBe('Recent')
    const cards = w.findAll('a.entry-link')
    // Up to 3 recent items pulled from projects + demos + notes combined.
    expect(cards.length).toBeGreaterThanOrEqual(1)
    expect(cards.length).toBeLessThanOrEqual(3)
    for (const c of cards) {
      expect(c.attributes('href')).toMatch(/^\/(projects|demos|notes)\//)
    }
  })
})
