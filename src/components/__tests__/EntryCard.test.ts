import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import EntryCard from '../EntryCard.vue'

function mountCard(props: Record<string, unknown>, slot = '') {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/notes/:slug', component: { template: '<div />' } },
      { path: '/', component: { template: '<div />' } },
    ],
  })
  return mount(EntryCard, {
    props: { to: '/notes/foo', title: 'T', summary: 'S', date: '2026-01-15', ...props },
    slots: { default: slot },
    global: { plugins: [router] },
  })
}

describe('EntryCard', () => {
  it('renders the title and summary', () => {
    const w = mountCard({})
    expect(w.find('.title').text()).toBe('T')
    expect(w.find('.summary').text()).toBe('S')
  })

  it('renders the formatted date inside a <time> with raw datetime', () => {
    const w = mountCard({ date: '2026-05-11' })
    const time = w.find('time')
    expect(time.attributes('datetime')).toBe('2026-05-11')
    expect(time.text()).toBe('May 11, 2026')
  })

  it('renders a RouterLink to the `to` prop', () => {
    const w = mountCard({ to: '/notes/abc' })
    const anchor = w.find('a.entry-link')
    expect(anchor.attributes('href')).toBe('/notes/abc')
  })

  it('renders the open indicator SVG with aria-hidden', () => {
    const w = mountCard({})
    const indicator = w.find('.open-indicator')
    expect(indicator.exists()).toBe(true)
    expect(indicator.attributes('aria-hidden')).toBe('true')
    expect(indicator.find('svg').exists()).toBe(true)
  })

  it('passes slot content through (e.g. tech chips)', () => {
    const w = mountCard({}, '<ul class="needle"><li>tag</li></ul>')
    expect(w.find('.needle li').text()).toBe('tag')
  })
})
