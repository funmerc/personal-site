<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import ComicPanel from '../components/ComicPanel.vue'

  useRouteMeta({
    title: 'Not found',
    description: "That page doesn't exist.",
    noindex: true,
  })
</script>

<template>
  <section class="page">
    <ComicPanel class="page-frame" :rotate="-1.5" size="lg">
      <p class="bang"><span class="action-text">404!</span></p>
      <h1>Not found</h1>
      <p class="lead">That panel doesn't exist. Try the menu.</p>
    </ComicPanel>
  </section>
</template>

<style scoped>
  .page {
    padding: 2rem 0.5rem 2rem;
  }

  .page-frame {
    align-items: flex-start;
    max-width: 42rem;
    gap: 1rem;
  }

  .bang {
    margin: 0;
  }

  .lead {
    margin: 0;
    color: var(--color-muted);
    font-family: var(--font-mono), monospace;
    font-size: 1rem;
  }
</style>
