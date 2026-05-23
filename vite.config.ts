import { defineConfig, type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { imagetools } from 'vite-imagetools'

// Serve /rss.xml in dev by regenerating it on each request. In production
// the postbuild step writes the same file to dist/.
function rssDevPlugin(): PluginOption {
  return {
    name: 'serve-rss-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/rss.xml', async (_req, res) => {
        try {
          const { generateRssString } = await import('./scripts/generate-rss.js')
          res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
          res.end(await generateRssString())
        } catch (err) {
          res.statusCode = 500
          res.end(`RSS generation failed: ${(err as Error).message}`)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [vue(), tailwindcss(), imagetools(), rssDevPlugin()],
})
