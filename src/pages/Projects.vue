<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import ComicPanel from '../components/ComicPanel.vue'

  useRouteMeta({
    title: 'Projects',
    description: "Things I've built and shipped, with the why behind each one.",
  })
</script>

<template>
  <section class="page">
    <ComicPanel class="page-frame" :rotate="-0.5" size="lg">
      <h1>Projects</h1>
      <p class="lead">First entries are being written up.</p>
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
