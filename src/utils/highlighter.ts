/**
 * Thin lazy wrapper around the Shiki bundle. The first call dynamic-imports
 * the heavy module (langs + themes + JS regex engine), every subsequent call
 * reuses the same singleton.
 */
let bundlePromise: Promise<typeof import('./shikiBundle')> | null = null

function getBundle() {
  if (!bundlePromise) {
    bundlePromise = import('./shikiBundle')
  }
  return bundlePromise
}

export async function highlight(code: string, lang: string): Promise<string> {
  const { highlight: doHighlight } = await getBundle()
  return doHighlight(code, lang)
}
