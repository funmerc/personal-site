import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import DemoDetail from '../DemoDetail.vue'

async function mountAt(slug: string) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/demos', component: { template: '<div />' } },
      { path: '/demos/:slug', component: DemoDetail, name: 'demo-detail' },
    ],
  })
  await router.push(`/demos/${slug}`)
  await router.isReady()
  const head = createHead()
  const wrapper = mount(DemoDetail, { global: { plugins: [router, head] } })
  await flushPromises()
  return wrapper
}

describe('DemoDetail page', () => {
  it('renders the not-found state for an unknown slug', async () => {
    const w = await mountAt('definitely-not-real')
    await flushPromises()
    expect(w.find('h1').text()).toBe('Not found')
    expect(w.find('a.inline-back').attributes('href')).toBe('/demos')
  })
})
