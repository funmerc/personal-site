<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useHead } from '@unhead/vue'
  import SiteNav from './components/SiteNav.vue'
  import SiteFooter from './components/SiteFooter.vue'
  import { useNavDirection } from './composables/useNavDirection'

  const slideDirection = useNavDirection()
  const route = useRoute()

  const origin = 'https://jasonrice.me'
  const defaultTitle = 'Jason Rice — Software engineer'
  const defaultDescription =
    'Software engineer working in public — projects, demos, and notes.'
  const ogImage = `${origin}/og.jpg`

  const canonical = computed(() => `${origin}${route.path}`)

  useHead({
    titleTemplate: (title) =>
      title && title !== defaultTitle ? `${title} · Jason Rice` : defaultTitle,
    link: [{ rel: 'canonical', href: canonical }],
    meta: [
      { name: 'description', content: defaultDescription },
      { name: 'theme-color', content: '#1A1A1A' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Jason Rice' },
      { property: 'og:title', content: defaultTitle },
      { property: 'og:description', content: defaultDescription },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Jason Rice — Software engineer' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: defaultTitle },
      { name: 'twitter:description', content: defaultDescription },
      { name: 'twitter:image', content: ogImage },
    ],
  })
</script>

<template>
  <div class="layout" :style="{ '--slide-direction': slideDirection }">
    <a class="skip-link" href="#main">Skip to content</a>
    <SiteNav />
    <main id="main" tabindex="-1">
      <RouterView v-slot="{ Component }">
        <Transition name="page-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 80rem;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 1rem 6rem;
  }

  @media (max-width: 600px) {
    main {
      padding-bottom: 10rem;
    }
  }

  main:focus {
    outline: none;
  }

  /* Skip-to-content link. Off-screen until focused via keyboard, then
     snaps into the top-left as a comic-style tab. */
  .skip-link {
    position: absolute;
    top: 0.75rem;
    left: 0.75rem;
    z-index: 100;
    background: var(--color-ink);
    color: var(--color-paper);
    border: 3px solid var(--color-ink);
    padding: 0.5rem 0.9rem;
    font-family: var(--font-mono), monospace;
    font-size: 0.85rem;
    text-decoration: none;
    transform: translateY(calc(-100% - 1.5rem));
    transition: transform var(--duration-quick) var(--ease-snap);
  }

  .skip-link:focus-visible {
    transform: translateY(0) rotate(-1deg);
    outline: 3px solid var(--color-signature);
    outline-offset: 4px;
  }
</style>
