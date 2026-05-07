import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Section order for direction-aware page transitions. Detail routes share
// their parent's index so drilling in/out is a fade, not a slide.
const sectionOrder: Record<string, number> = {
  home: 0,
  projects: 1,
  'project-detail': 1,
  demos: 2,
  'demo-detail': 2,
  notes: 3,
  'note-detail': 3,
  about: 4,
  uses: 5,
}

function indexOf(name: unknown): number {
  return typeof name === 'string' ? (sectionOrder[name] ?? 0) : 0
}

const direction = ref(0)
let initialized = false

export function useNavDirection() {
  if (!initialized) {
    initialized = true
    const router = useRouter()
    let previousIndex = indexOf(router.currentRoute.value.name)
    router.afterEach((to) => {
      const newIndex = indexOf(to.name)
      const delta = newIndex - previousIndex
      direction.value = delta === 0 ? 0 : delta > 0 ? 1 : -1
      previousIndex = newIndex
    })
  }
  return direction
}
