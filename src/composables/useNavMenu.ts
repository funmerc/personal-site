import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

// Mobile nav sheet state. The `animating` flag is what gates the CSS
// transition. Without it, dragging the viewport into mobile width would
// animate the menu's opacity from desktop (1) to mobile-closed (0) and
// cause a brief flash.
export function useNavMenu() {
  const open = ref(false)
  const animating = ref(false)
  const route = useRoute()
  let animationTimer: number | undefined

  function flagAnimating() {
    animating.value = true
    if (animationTimer !== undefined) {
      window.clearTimeout(animationTimer)
    }
    animationTimer = window.setTimeout(() => {
      animating.value = false
      animationTimer = undefined
    }, 220)
  }

  watch(
    () => route.fullPath,
    () => {
      if (open.value) {
        flagAnimating()
        open.value = false
      }
    },
  )

  function toggle() {
    flagAnimating()
    open.value = !open.value
  }

  function close() {
    if (!open.value) {
      return
    }
    flagAnimating()
    open.value = false
  }

  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      close()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', onKey)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    if (animationTimer !== undefined) {
      window.clearTimeout(animationTimer)
    }
  })

  return { open, animating, toggle, close }
}
