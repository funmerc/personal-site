<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useProseLinks } from '../composables/useProseLinks'
  import ComicPanel from '../components/ComicPanel.vue'
  import Loader from '../components/Loader.vue'
  import { getDemo } from '../content'
  import { formatDate } from '../utils/formatDate'
  import { renderMarkdown } from '../utils/markdown'

  const route = useRoute()
  const demo = computed(() => getDemo(String(route.params.slug)))

  const bodyHtml = ref('')
  const loaded = ref(false)
  watchEffect(async () => {
    if (!demo.value?.body) {
      bodyHtml.value = ''
      loaded.value = true
      return
    }
    bodyHtml.value = await renderMarkdown(demo.value.body)
    loaded.value = true
  })

  const proseEl = ref<HTMLElement | null>(null)
  useProseLinks(proseEl)

  useRouteMeta({
    title: () => demo.value?.title ?? 'Demo not found',
    description: () => demo.value?.summary ?? 'No demo with that slug.',
  })
</script>

<template>
  <section class="page">
    <div class="fade-content" :class="{ 'is-loading': !loaded }">
    <RouterLink v-if="demo" to="/demos" class="back-tab">← Demos</RouterLink>
    <ComicPanel class="page-frame" :rotate="-0.6" size="lg">
      <template v-if="demo">
        <header class="head">
          <h1>{{ demo.title }}</h1>
          <p class="meta">
            <time :datetime="demo.date">{{ formatDate(demo.date) }}</time>
          </p>
          <p class="summary">{{ demo.summary }}</p>
        </header>

        <ul v-if="demo.tech.length" class="chips">
          <li v-for="t in demo.tech" :key="t" class="chip">{{ t }}</li>
        </ul>

        <div
          v-if="demo.links && (demo.links.live || demo.links.repo)"
          class="links"
        >
          <a
            v-if="demo.links.live"
            :href="demo.links.live"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Live →
          </a>
          <a
            v-if="demo.links.repo"
            :href="demo.links.repo"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Repo →
          </a>
        </div>

        <div v-if="bodyHtml" ref="proseEl" class="prose" v-html="bodyHtml" />

        <ul v-if="demo.tags?.length" class="tags">
          <li v-for="t in demo.tags" :key="t" class="chip">{{ t }}</li>
        </ul>
      </template>
      <template v-else>
        <h1>Not found</h1>
        <p class="lead">
          No demo with that slug.
          <RouterLink to="/demos" class="inline-back">← Back to demos</RouterLink>
        </p>
      </template>
    </ComicPanel>
    </div>
    <Transition name="loader-fade">
      <Loader v-if="!loaded" />
    </Transition>
  </section>
</template>

<style scoped>
  .loader-fade-leave-active {
    transition: opacity 250ms ease-out;
  }

  .loader-fade-leave-to {
    opacity: 0;
  }
</style>

