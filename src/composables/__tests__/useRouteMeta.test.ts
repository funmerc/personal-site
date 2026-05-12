import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, toValue } from 'vue'

// Mock useHead so we can assert on the exact shape useRouteMeta hands it.
// This keeps the test focused on the wrapper logic rather than unhead's DOM
// scheduling, which is async + jsdom-flaky.
const useHeadSpy = vi.fn()
vi.mock('@unhead/vue', () => ({
  useHead: (...args: unknown[]) => useHeadSpy(...args),
}))

// Import AFTER the mock so useRouteMeta picks it up.
const { useRouteMeta } = await import('../useRouteMeta')

function callPayload() {
  return useHeadSpy.mock.calls.at(-1)?.[0] as {
    title: () => string
    meta: Array<{
      name?: string
      property?: string
      content: string | (() => string)
    }>
  }
}

function metaByName(name: string) {
  return callPayload().meta.find((m) => m.name === name)
}
function metaByProperty(property: string) {
  return callPayload().meta.find((m) => m.property === property)
}

describe('useRouteMeta', () => {
  beforeEach(() => {
    useHeadSpy.mockClear()
  })

  it('sets title from a static string', () => {
    useRouteMeta({ title: 'Notes', description: 'Writing.' })
    expect(callPayload().title()).toBe('Notes')
  })

  it('emits description, og:title, og:description, twitter:title, twitter:description', () => {
    useRouteMeta({ title: 'Notes', description: 'Writing.' })
    expect(toValue(metaByName('description')!.content)).toBe('Writing.')
    expect(toValue(metaByProperty('og:title')!.content)).toBe('Notes · Jason Rice')
    expect(toValue(metaByProperty('og:description')!.content)).toBe('Writing.')
    expect(toValue(metaByName('twitter:title')!.content)).toBe('Notes · Jason Rice')
    expect(toValue(metaByName('twitter:description')!.content)).toBe('Writing.')
  })

  it('reads reactively from a getter source', () => {
    const t = ref('First')
    useRouteMeta({ title: () => t.value, description: 'd' })
    expect(callPayload().title()).toBe('First')
    t.value = 'Second'
    expect(callPayload().title()).toBe('Second')
  })

  it('adds robots=noindex when noindex is true', () => {
    useRouteMeta({ title: 'Lost', description: 'd', noindex: true })
    expect(toValue(metaByName('robots')!.content)).toBe('noindex')
  })

  it('omits robots meta when noindex is not set', () => {
    useRouteMeta({ title: 'X', description: 'd' })
    expect(metaByName('robots')).toBeUndefined()
  })
})
