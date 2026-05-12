<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import ComicPanel from '../components/ComicPanel.vue'
  import { getProject } from '../content'
  import { formatDate } from '../utils/formatDate'
  import { renderMarkdown } from '../utils/markdown'

  const route = useRoute()
  const project = computed(() => getProject(String(route.params.slug)))
  const bodyHtml = computed(() =>
    project.value?.body ? renderMarkdown(project.value.body) : '',
  )

  useRouteMeta({
    title: () => project.value?.title ?? 'Project not found',
    description: () => project.value?.summary ?? 'No project with that slug.',
  })
</script>

<template>
  <section class="page">
    <RouterLink v-if="project" to="/projects" class="back-tab">← Projects</RouterLink>
    <ComicPanel class="page-frame" :rotate="0.5" size="lg">
      <template v-if="project">
        <header class="head">
          <h1>{{ project.title }}</h1>
          <p class="meta">
            <time :datetime="project.date">{{ formatDate(project.date) }}</time>
            <template v-if="project.period">
              <span aria-hidden="true">·</span>
              <span>{{ project.period }}</span>
            </template>
            <template v-if="project.role">
              <span aria-hidden="true">·</span>
              <span>{{ project.role }}</span>
            </template>
          </p>
          <p class="summary">{{ project.summary }}</p>
        </header>

        <ul v-if="project.tech.length" class="chips">
          <li v-for="t in project.tech" :key="t" class="chip">{{ t }}</li>
        </ul>

        <div
          v-if="project.links && (project.links.live || project.links.repo || project.links.demo)"
          class="links"
        >
          <a
            v-if="project.links.live"
            :href="project.links.live"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Live →
          </a>
          <a
            v-if="project.links.repo"
            :href="project.links.repo"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Repo →
          </a>
          <a
            v-if="project.links.demo"
            :href="project.links.demo"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Demo →
          </a>
        </div>

        <div v-if="bodyHtml" class="prose" v-html="bodyHtml" />

        <ul v-if="project.tags?.length" class="tags">
          <li v-for="t in project.tags" :key="t" class="chip">{{ t }}</li>
        </ul>
      </template>
      <template v-else>
        <h1>Not found</h1>
        <p class="lead">
          No project with that slug.
          <RouterLink to="/projects" class="inline-back">← Back to projects</RouterLink>
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
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
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
