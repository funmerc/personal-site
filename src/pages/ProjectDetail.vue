<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import ComicPanel from '../components/ComicPanel.vue'

  // Placeholder until the projects data layer lands; detail pages will then
  // derive title/description from the loaded entry.
  useRouteMeta({
    title: 'Project',
    description: 'Project writeup.',
  })
</script>

<template>
  <section class="page">
    <ComicPanel class="page-frame" :rotate="0.5" size="lg">
      <h1>Project detail</h1>
      <p class="lead">Detail layout lands once the data layer does.</p>
    </ComicPanel>
  </section>
</template>

<style scoped>
  .page {
    padding: 1.5rem 0.5rem 2rem;
  }

  .page-frame {
    max-width: 42rem;
    gap: 0.85rem;
  }

  .lead {
    margin: 0;
    color: var(--color-muted);
    font-family: var(--font-mono), monospace;
    font-size: 0.95rem;
  }
</style>
