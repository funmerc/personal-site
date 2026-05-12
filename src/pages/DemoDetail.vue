<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useProseLinks } from '../composables/useProseLinks'
  import ComicPanel from '../components/ComicPanel.vue'
  import { getDemo } from '../content'
  import { formatDate } from '../utils/formatDate'
  import { renderMarkdown } from '../utils/markdown'

  const route = useRoute()
  const demo = computed(() => getDemo(String(route.params.slug)))
  const bodyHtml = computed(() =>
    demo.value?.body ? renderMarkdown(demo.value.body) : '',
  )

  const proseEl = ref<HTMLElement | null>(null)
  useProseLinks(proseEl)

  useRouteMeta({
    title: () => demo.value?.title ?? 'Demo not found',
    description: () => demo.value?.summary ?? 'No demo with that slug.',
  })
</script>

<template>
  <section class="page">
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

  .summary {
    margin: 0.25rem 0 0;
    font-size: 1rem;
    line-height: 1.55;
  }

  .chips,
  .tags {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .ext {
    display: inline-block;
    background: var(--color-ink);
    color: var(--color-paper);
    border: 2px solid var(--color-ink);
    padding: 0.35rem 0.7rem;
    font-family: var(--font-mono), monospace;
    font-size: 0.85rem;
    text-decoration: none;
    transition: transform var(--duration-quick) var(--ease-snap);
    will-change: transform;
  }

  .ext:hover {
    transform: translate(-2px, -2px);
    background: var(--color-signature);
    color: var(--color-ink);
  }

  .ext:focus-visible,
  .inline-back:focus-visible {
    outline: 3px solid var(--color-signature);
    outline-offset: 4px;
  }

  .lead {
    margin: 0;
    color: var(--color-muted);
    font-family: var(--font-mono), monospace;
    font-size: 0.95rem;
  }
</style>
