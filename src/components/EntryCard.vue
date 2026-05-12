<script setup lang="ts">
  import { formatDate } from '../utils/formatDate'
  import ComicPanel from './ComicPanel.vue'

  withDefaults(
    defineProps<{
      to: string
      title: string
      summary: string
      date: string
      tone?: 'paper' | 'ink'
      rotate?: number
    }>(),
    {
      tone: 'paper',
      rotate: 0,
    },
  )
</script>

<template>
  <RouterLink :to="to" class="entry-link">
    <ComicPanel :tone="tone" :rotate="rotate" size="md" class="entry-panel">
      <header class="header">
        <h2 class="title">{{ title }}</h2>
        <time class="date" :datetime="date">{{ formatDate(date) }}</time>
      </header>
      <p class="summary">{{ summary }}</p>
      <slot />
    </ComicPanel>
  </RouterLink>
</template>

<style scoped>
  .entry-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .entry-link :deep(.comic-panel) {
    gap: 0.55rem;
  }

  .entry-link:hover :deep(.comic-panel) {
    transform: rotate(var(--panel-rotate, 0deg)) translate(-3px, -3px);
  }

  .entry-link:focus-visible {
    outline: 3px solid var(--color-signature);
    outline-offset: 4px;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .title {
    margin: 0;
    font-family: var(--font-display), cursive;
    font-size: 1.5rem;
    letter-spacing: 0.02em;
  }

  .date {
    font-family: var(--font-mono), monospace;
    font-size: 0.78rem;
    color: color-mix(in srgb, currentColor 65%, transparent);
    white-space: nowrap;
  }

  .summary {
    margin: 0;
    line-height: 1.55;
    font-size: 0.95rem;
  }
</style>
