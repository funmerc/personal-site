import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import Uses from '../Uses.vue'
import { usesFixture } from '../../test/api-fixtures'

async function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/uses', component: { template: '<div />' } }],
  })
  const head = createHead()
  const wrapper = mount(Uses, { global: { plugins: [router, head] } })
  await flushPromises()
  return wrapper
}

describe('Uses page', () => {
  it('renders the page title', async () => {
    const w = await mountPage()
    expect(w.find('h1').text()).toBe('Uses')
  })

  it('renders a section panel for each section from /uses', async () => {
    const w = await mountPage()
    const headings = w.findAll('.section-label')
    expect(headings).toHaveLength(usesFixture.sections.length)
    expect(headings.map((h) => h.text())).toEqual(
      usesFixture.sections.map((s) => s.label),
    )
  })
})
