import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// useTheme keeps module-level state (preference, systemPrefersDark,
// initialized). We need a fresh module per test to exercise initialization
// branches without leakage.
async function freshUseTheme() {
  vi.resetModules()
  const mod = await import('../useTheme')
  return mod.useTheme
}

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('defaults to light when no saved preference and system is light', async () => {
    const useTheme = await freshUseTheme()
    const { effective } = useTheme()
    expect(effective.value).toBe('light')
  })

  it('uses system dark when no saved preference and system is dark', async () => {
    const mq = vi.spyOn(window, 'matchMedia').mockImplementation(
      (q: string) =>
        ({
          matches: true,
          media: q,
          addEventListener: () => {},
          removeEventListener: () => {},
        }) as unknown as MediaQueryList,
    )
    const useTheme = await freshUseTheme()
    const { effective } = useTheme()
    expect(effective.value).toBe('dark')
    mq.mockRestore()
  })

  it('respects a saved preference over system', async () => {
    localStorage.setItem('theme', 'light')
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (q: string) =>
        ({
          matches: true, // system dark
          media: q,
          addEventListener: () => {},
          removeEventListener: () => {},
        }) as unknown as MediaQueryList,
    )
    const useTheme = await freshUseTheme()
    const { effective } = useTheme()
    expect(effective.value).toBe('light')
  })

  it('toggle flips effective and persists to localStorage + data-theme attr', async () => {
    const useTheme = await freshUseTheme()
    const { effective, toggle } = useTheme()
    expect(effective.value).toBe('light')

    toggle()
    expect(effective.value).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    toggle()
    expect(effective.value).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})
