<script setup lang="ts">
  import { useHead } from '@unhead/vue'
  import SiteNav from './components/SiteNav.vue'
  import SiteFooter from './components/SiteFooter.vue'
  import { useNavDirection } from './composables/useNavDirection'

  const slideDirection = useNavDirection()

  const defaultTitle = 'Jason Rice — Software engineer'
  const defaultDescription =
    'Software engineer working in public — projects, demos, and notes.'

  useHead({
    titleTemplate: (title) =>
      title && title !== defaultTitle ? `${title} · Jason Rice` : defaultTitle,
    meta: [
      { name: 'description', content: defaultDescription },
      { name: 'theme-color', content: '#1A1A1A' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Jason Rice' },
      { property: 'og:title', content: defaultTitle },
      { property: 'og:description', content: defaultDescription },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: defaultTitle },
      { name: 'twitter:description', content: defaultDescription },
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
