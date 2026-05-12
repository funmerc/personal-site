import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import NotFound from '../NotFound.vue'

function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: { template: '<div />' } }],
  })
  const head = createHead()
  return mount(NotFound, { global: { plugins: [router, head] } })
}

describe('NotFound page', () => {
  it('mounts and renders the 404 action text', () => {
    const w = mountPage()
    expect(w.find('.action-text').text()).toContain('404')
  })

  it('renders the heading and lead copy', () => {
    const w = mountPage()
    expect(w.find('h1').text()).toBe('Off-panel')
    expect(w.find('.lead').text()).toContain("doesn't exist")
  })

  it('renders a home link', () => {
    const w = mountPage()
    expect(w.find('a.home-cta').attributes('href')).toBe('/')
  })
})
