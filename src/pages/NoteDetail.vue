<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useProseLinks } from '../composables/useProseLinks'
  import ComicPanel from '../components/ComicPanel.vue'
  import { getNote } from '../content'
  import { formatDate } from '../utils/formatDate'
  import { renderMarkdown } from '../utils/markdown'

  const route = useRoute()
  const note = computed(() => getNote(String(route.params.slug)))
  const bodyHtml = computed(() =>
    note.value ? renderMarkdown(note.value.body) : '',
  )

  const proseEl = ref<HTMLElement | null>(null)
  useProseLinks(proseEl)

  useRouteMeta({
    title: () => note.value?.title ?? 'Note not found',
    description: () => note.value?.summary ?? 'No note with that slug.',
  })
</script>

<template>
  <section class="page">
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
  </section>
</template>

<style scoped>
  .page {
    padding: 1.5rem 0.5rem 2rem;
    max-width: 56rem;
    margin: 0 auto;
  }

  .page-frame {
    gap: 1.25rem;
  }

  .back-tab {
    display: inline-block;
    background: var(--color-paper);
    color: var(--color-ink);
    border: 3px solid var(--color-ink);
    box-shadow: 4px 4px 0 var(--color-ink);
    padding: 0.4rem 0.85rem;
    margin-bottom: 1rem;
    font-family: var(--font-mono), monospace;
    font-size: 0.85rem;
    text-decoration: none;
    transform: rotate(-1.5deg) translateZ(0);
    backface-visibility: hidden;
    transition:
      transform var(--duration-quick) var(--ease-snap),
      color var(--duration-quick) var(--ease-snap);
    will-change: transform;
  }

  .back-tab:hover {
    transform: rotate(-1.5deg) translateZ(0) translate(-2px, -2px);
    color: var(--color-signature);
  }

  .back-tab:focus-visible {
    outline: 3px solid var(--color-signature);
    outline-offset: 4px;
  }

  .inline-back {
    color: var(--color-muted);
    text-decoration: none;
  }

  .inline-back:hover {
    color: var(--color-signature);
  }

  .inline-back:focus-visible {
    outline: 3px solid var(--color-signature);
    outline-offset: 4px;
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .meta {
    margin: 0;
    color: var(--color-muted);
    font-family: var(--font-mono), monospace;
    font-size: 0.8rem;
  }

  .tags {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .lead {
    margin: 0;
    color: var(--color-muted);
    font-family: var(--font-mono), monospace;
    font-size: 0.95rem;
  }
</style>
