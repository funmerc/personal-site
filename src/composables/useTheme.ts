import { computed, ref } from 'vue'

const STORAGE_KEY = 'theme'

type ThemePreference = 'light' | 'dark' | null
type EffectiveTheme = 'light' | 'dark'

const preference = ref<ThemePreference>(null)
const systemPrefersDark = ref(false)
let initialized = false

function applyToDocument(value: ThemePreference) {
  if (value) {
    document.documentElement.setAttribute('data-theme', value)
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

function init() {
  if (initialized) {
    return
  }
  initialized = true

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') {
      preference.value = saved
    }
  } catch {
    // No localStorage available, so just fall back to the system preference.
  }

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  systemPrefersDark.value = media.matches
  media.addEventListener('change', (event) => {
    systemPrefersDark.value = event.matches
  })
}

export function useTheme() {
  init()

  const effective = computed<EffectiveTheme>(() => {
    if (preference.value) {
      return preference.value
    }
    return systemPrefersDark.value ? 'dark' : 'light'
  })

  function toggle() {
    const next: EffectiveTheme = effective.value === 'dark' ? 'light' : 'dark'
    preference.value = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // No storage available, so we just keep the choice in memory for this session.
    }
    applyToDocument(next)
  }

  return {
    effective,
    toggle,
  }
}
