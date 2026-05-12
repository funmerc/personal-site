import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Loader from '../Loader.vue'

describe('Loader', () => {
  it('renders an aria-hidden overlay with an img', () => {
    const w = mount(Loader)
    const root = w.find('.loader')
    expect(root.exists()).toBe(true)
    expect(root.attributes('aria-hidden')).toBe('true')
    expect(w.find('img').exists()).toBe(true)
  })

  it('image src is a string (resolved by Vite asset pipeline)', () => {
    const w = mount(Loader)
    const src = w.find('img').attributes('src')
    expect(typeof src).toBe('string')
    expect(src && src.length).toBeGreaterThan(0)
  })
})
