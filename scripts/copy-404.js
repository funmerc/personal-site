import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// 404.html specifically needed for Pages, it handles file not found before the router takes hold.
export function copy404() {
  const dist = resolve('dist')
  copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
  console.log('Copied index.html to 404.html')
}
