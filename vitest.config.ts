import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'

const pictureStub = fileURLToPath(
  new URL('./src/test/picture-stub.ts', import.meta.url),
)

// Intercepts vite-imagetools `?as=picture` imports and redirects them to a
// static stub. The plugin runs in the `pre` phase so it short-circuits Vite's
// import-analysis before it tries (and fails) to resolve the real file with
// its imagetools-specific query string.
const stubPictureImports = {
  name: 'stub-picture-imports',
  enforce: 'pre' as const,
  resolveId(id: string) {
    if (id.includes('as=picture')) return pictureStub
    return null
  },
}

// Separate from vite.config.ts so we don't run imagetools (slow image
// processing) on every test. Vitest gets just what it needs: Vue SFC support
// and a jsdom environment.
export default defineConfig({
  plugins: [stubPictureImports, vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/__tests__/*.test.ts'],
  },
})
