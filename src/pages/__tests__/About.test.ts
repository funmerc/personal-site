import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import About from '../About.vue'

function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/about', component: { template: '<div />' } }],
  })
  const head = createHead()
  return mount(About, { global: { plugins: [router, head] } })
}

describe('About page', () => {
  it('renders the page title', () => {
    const w = mountPage()
    expect(w.find('h1').text()).toBe('About')
  })

  it('renders the banner picture via the imagetools stub', () => {
    const w = mountPage()
    expect(w.find('.banner picture').exists()).toBe(true)
    expect(w.find('.banner img').attributes('src')).toBe('/stub.jpeg')
  })

  it('renders at least one section heading from the data', () => {
    const w = mountPage()
    const titles = w.findAll('.section-title').map((n) => n.text())
    // Pages's about.json drives these; at minimum "Why" should appear.
    expect(titles).toContain('Why')
  })
})
