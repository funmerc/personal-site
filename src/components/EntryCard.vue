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
      <span class="open-indicator" aria-hidden="true">
        <svg
          viewBox="0 0 16 16"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 11 L11 5" />
          <path d="M7 5 L11 5 L11 9" />
        </svg>
      </span>
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
    /* Leave room so the date doesn't crash into the corner indicator. */
    padding-right: 2rem;
  }

  /* Small comic-tab badge in the top-right corner signalling "openable".
     Uses currentColor so it inverts on ink-tone cards. */
  .open-indicator {
    position: absolute;
    top: 0.55rem;
    right: 0.55rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid currentColor;
    background: transparent;
    transform: rotate(3deg);
    transition: transform var(--duration-quick) var(--ease-snap);
  }

  .entry-link:hover .open-indicator {
    transform: rotate(3deg) translate(2px, -2px);
    color: var(--color-signature);
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
