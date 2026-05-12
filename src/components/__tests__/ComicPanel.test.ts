import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ComicPanel from '../ComicPanel.vue'

describe('ComicPanel', () => {
  it('applies default tone/size/border classes', () => {
    const w = mount(ComicPanel, { slots: { default: 'x' } })
    const root = w.element
    expect(root.classList.contains('is-tone-paper')).toBe(true)
    expect(root.classList.contains('is-size-md')).toBe(true)
    expect(root.classList.contains('is-bordered')).toBe(true)
  })

  it('applies ink tone and explicit size', () => {
    const w = mount(ComicPanel, {
      props: { tone: 'ink', size: 'lg' },
      slots: { default: 'x' },
    })
    expect(w.element.classList.contains('is-tone-ink')).toBe(true)
    expect(w.element.classList.contains('is-size-lg')).toBe(true)
  })

  it('drops the bordered class when border=false', () => {
    const w = mount(ComicPanel, {
      props: { border: false },
      slots: { default: 'x' },
    })
    expect(w.element.classList.contains('is-bordered')).toBe(false)
  })

  it('passes rotate prop through as a CSS variable', () => {
    const w = mount(ComicPanel, {
      props: { rotate: 2.5 },
      slots: { default: 'x' },
    })
    const styleAttr = w.element.getAttribute('style') ?? ''
    expect(styleAttr).toContain('--panel-rotate: 2.5deg')
  })

  it('renders slot content', () => {
    const w = mount(ComicPanel, {
      slots: { default: '<p class="needle">hello</p>' },
    })
    expect(w.find('.needle').text()).toBe('hello')
  })
})
