import { vi } from 'vitest'
import { installFetchMock } from './api-fixtures'

// Lock in a stable base URL for tests before any module reads
// import.meta.env.VITE_API_BASE_URL (api.ts does this at import time).
vi.stubEnv('VITE_API_BASE_URL', 'http://test.local')

// Reroute every API call through our in-memory fixtures.
installFetchMock()

// Polyfills jsdom doesn't ship with. Loaded once before each test file.
// useTheme calls window.matchMedia and jsdom doesn't include it.
if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  })
}
