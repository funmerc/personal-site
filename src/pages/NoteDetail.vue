<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useProseLinks } from '../composables/useProseLinks'
  import ComicPanel from '../components/ComicPanel.vue'
  import Loader from '../components/Loader.vue'
  import { getNote } from '../content'
  import { formatDate } from '../utils/formatDate'
  import { renderMarkdown } from '../utils/markdown'

  const route = useRoute()
  const note = computed(() => getNote(String(route.params.slug)))

  const bodyHtml = ref('')
  const loaded = ref(false)
  watchEffect(async () => {
    if (!note.value) {
      bodyHtml.value = ''
      loaded.value = true
      return
    }
    bodyHtml.value = await renderMarkdown(note.value.body)
    loaded.value = true
  })

  const proseEl = ref<HTMLElement | null>(null)
  useProseLinks(proseEl)

  useRouteMeta({
    title: () => note.value?.title ?? 'Note not found',
    description: () => note.value?.summary ?? 'No note with that slug.',
  })
</script>

<template>
  <section class="page">
    <div class="fade-content" :class="{ 'is-loading': !loaded }">
      <RouterLink v-if="note" to="/notes" class="back-tab">← Notes</RouterLink>
      <ComicPanel class="page-frame" :rotate="0.4" size="lg">
        <template v-if="note">
          <header class="head">
            <h1>{{ note.title }}</h1>
            <p class="meta">
              <time :datetime="note.date">{{ formatDate(note.date) }}</time>
            </p>
          </header>
          <div ref="proseEl" class="prose" v-html="bodyHtml" />
          <ul v-if="note.tags?.length" class="tags">
            <li v-for="t in note.tags" :key="t" class="chip">{{ t }}</li>
          </ul>
        </template>
        <template v-else>
          <h1>Not found</h1>
          <p class="lead">
            No note with that slug.
            <RouterLink to="/notes" class="inline-back">← Back to notes</RouterLink>
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

