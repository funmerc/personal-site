<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import ComicPanel from '../components/ComicPanel.vue'

  useRouteMeta({
    title: 'Notes',
    description: 'Writing on engineering and building.',
  })
</script>

<template>
  <section class="page">
    <ComicPanel class="page-frame" :rotate="-0.8" size="lg">
      <h1>Notes</h1>
      <p class="lead">First posts are being drafted.</p>
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
