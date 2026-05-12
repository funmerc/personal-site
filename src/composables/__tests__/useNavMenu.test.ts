import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useNavMenu } from '../useNavMenu'

// Capture the ref-bag via closure rather than `wrapper.vm` so refs stay
// refs and we can read `.value` (Vue's public proxy auto-unwraps).
function harness() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div />' }, name: 'home' },
      { path: '/notes', component: { template: '<div />' }, name: 'notes' },
    ],
  })

  let menu: ReturnType<typeof useNavMenu>
  const Harness = defineComponent({
    setup() {
      menu = useNavMenu()
      return () => h('div')
    },
  })

  const wrapper = mount(Harness, { global: { plugins: [router] } })
  return { wrapper, router, menu: menu! }
}

describe('useNavMenu', () => {
  beforeEach(() => {
    vi.useRealTimers()
  })

  it('starts closed', () => {
    const { menu } = harness()
    expect(menu.open.value).toBe(false)
    expect(menu.animating.value).toBe(false)
  })

  it('toggle flips open and sets animating briefly', () => {
    vi.useFakeTimers()
    const { menu } = harness()
    menu.toggle()
    expect(menu.open.value).toBe(true)
    expect(menu.animating.value).toBe(true)
    vi.advanceTimersByTime(250)
    expect(menu.animating.value).toBe(false)
  })

  it('close is a no-op when already closed', () => {
    const { menu } = harness()
    menu.close()
    expect(menu.open.value).toBe(false)
    expect(menu.animating.value).toBe(false)
  })

  it('Escape key closes the menu', () => {
    const { menu } = harness()
    menu.toggle()
    expect(menu.open.value).toBe(true)
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    expect(menu.open.value).toBe(false)
  })

  it('route change closes an open menu', async () => {
    const { menu, router } = harness()
    menu.toggle()
    expect(menu.open.value).toBe(true)
    await router.push('/notes')
    await nextTick()
    expect(menu.open.value).toBe(false)
  })
})
