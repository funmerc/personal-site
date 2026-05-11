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
  const ogImage = `${origin}/og.png`

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
    <SiteNav />
    <main>
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
    padding: 2rem 1rem;
  }
</style>
