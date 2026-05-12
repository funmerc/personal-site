import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import Uses from '../Uses.vue'
import usesData from '../../data/uses.json'

function mountPage() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/uses', component: { template: '<div />' } }],
  })
  const head = createHead()
  return mount(Uses, { global: { plugins: [router, head] } })
}

describe('Uses page', () => {
  it('renders the page title', () => {
    const w = mountPage()
    expect(w.find('h1').text()).toBe('Uses')
  })

  it('renders a section panel for each section in uses.json', () => {
    const w = mountPage()
    const headings = w.findAll('.section-label')
    expect(headings).toHaveLength(usesData.sections.length)
    expect(headings.map((h) => h.text())).toEqual(
      usesData.sections.map((s) => s.label),
    )
  })
})
