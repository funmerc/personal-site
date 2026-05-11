<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import ComicPanel from '../components/ComicPanel.vue'

  useRouteMeta({
    title: 'Uses',
    description: 'The tools, hardware, and setup I work with.',
  })
</script>

<template>
  <section class="page">
    <ComicPanel class="page-frame" :rotate="-0.4" size="lg">
      <h1>Uses</h1>
      <p class="lead">Sorting through the rig.</p>
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
