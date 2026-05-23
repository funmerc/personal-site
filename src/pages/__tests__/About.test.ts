import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import About from '../About.vue'

async function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/about', component: { template: '<div />' } }],
  })
  const head = createHead()
  const wrapper = mount(About, { global: { plugins: [router, head] } })
  await flushPromises()
  return wrapper
}

describe('About page', () => {
  it('renders the page title', async () => {
    const w = await mountPage()
    expect(w.find('h1').text()).toBe('About')
  })

  it('renders the banner picture via the imagetools stub', async () => {
    const w = await mountPage()
    expect(w.find('.banner picture').exists()).toBe(true)
    expect(w.find('.banner img').attributes('src')).toBe('/stub.jpeg')
  })

  it('renders at least one section heading from the data', async () => {
    const w = await mountPage()
    const titles = w.findAll('.section-title').map((n) => n.text())
    expect(titles).toContain('Why')
  })
})
