import { onBeforeUnmount, onMounted, watch, type Ref } from 'vue'
import { useRouter } from 'vue-router'

/**
 * Intercept clicks on internal links (href starting with `/`) inside the
 * given element and route them through Vue Router instead of triggering a
 * full page reload. External links and modified clicks (cmd/ctrl/shift/middle
 * button) pass through untouched so new-tab behavior still works.
 */
export function useProseLinks(elRef: Ref<HTMLElement | null>) {
  const router = useRouter()

  function onClick(event: MouseEvent) {
    if (event.defaultPrevented) {
      return
    }
    if (event.button !== 0) {
      return
    }
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }

    const target = event.target as HTMLElement | null
    const anchor = target?.closest('a') as HTMLAnchorElement | null
    if (!anchor) {
      return
    }

    const href = anchor.getAttribute('href')
    if (!href || !href.startsWith('/')) {
      return
    }
    if (anchor.target === '_blank') {
      return
    }

    event.preventDefault()
    router.push(href)
  }

  let attached: HTMLElement | null = null

  function attach(element: HTMLElement | null) {
    if (attached) {
      attached.removeEventListener('click', onClick)
    }
    attached = element
    element?.addEventListener('click', onClick)
  }

  onMounted(() => attach(elRef.value))
  watch(elRef, (element) => attach(element))
  onBeforeUnmount(() => attach(null))
}
