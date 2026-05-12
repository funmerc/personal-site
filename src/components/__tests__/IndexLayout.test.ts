import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexLayout from '../IndexLayout.vue'

describe('IndexLayout', () => {
  it('renders the title in an h1', () => {
    const w = mount(IndexLayout, {
      props: { title: 'Notes' },
      slots: { default: '<p>body</p>' },
    })
    expect(w.find('h1').text()).toBe('Notes')
  })

  it('renders default slot content in the body', () => {
    const w = mount(IndexLayout, {
      props: { title: 'X' },
      slots: { default: '<p class="needle">hello</p>' },
    })
    expect(w.find('.needle').text()).toBe('hello')
  })

  it('does not render the Loader by default', () => {
    const w = mount(IndexLayout, {
      props: { title: 'X' },
    })
    expect(w.find('.loader').exists()).toBe(false)
  })

  it('renders the Loader when loading=true', () => {
    const w = mount(IndexLayout, {
      props: { title: 'X', loading: true },
    })
    expect(w.find('.loader').exists()).toBe(true)
  })
})
