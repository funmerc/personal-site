import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import Demos from '../Demos.vue'

function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/demos', component: { template: '<div />' } },
      { path: '/demos/:slug', component: { template: '<div />' } },
    ],
  })
  const head = createHead()
  return mount(Demos, { global: { plugins: [router, head] } })
}

describe('Demos page', () => {
  it('renders the page title', () => {
    const w = mountPage()
    expect(w.find('h1').text()).toBe('Demos')
  })

  it('shows the empty state when demos.json is empty', () => {
    const w = mountPage()
    expect(w.find('.lead').text()).toContain('experiments')
    expect(w.findAll('a.entry-link')).toHaveLength(0)
  })

  it('renders the banner picture via the imagetools stub', () => {
    const w = mountPage()
    expect(w.find('.banner picture').exists()).toBe(true)
    expect(w.find('.banner img').attributes('src')).toBe('/stub.jpeg')
  })
})
