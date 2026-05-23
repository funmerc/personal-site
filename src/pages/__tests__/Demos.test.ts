import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import Demos from '../Demos.vue'

async function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/demos', component: { template: '<div />' } },
      { path: '/demos/:slug', component: { template: '<div />' } },
    ],
  })
  const head = createHead()
  const wrapper = mount(Demos, { global: { plugins: [router, head] } })
  await flushPromises()
  return wrapper
}

describe('Demos page', () => {
  it('renders the page title', async () => {
    const w = await mountPage()
    expect(w.find('h1').text()).toBe('Demos')
  })

  it('renders demo entries from the API', async () => {
    const w = await mountPage()
    expect(w.findAll('a.entry-link').length).toBeGreaterThan(0)
  })

  it('renders the banner picture via the imagetools stub', async () => {
    const w = await mountPage()
    expect(w.find('.banner picture').exists()).toBe(true)
    expect(w.find('.banner img').attributes('src')).toBe('/stub.jpeg')
  })
})
