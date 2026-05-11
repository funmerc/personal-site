<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import ComicPanel from '../components/ComicPanel.vue'

  useRouteMeta({
    title: 'About',
    description: "Who I am and what I'm working on.",
  })
</script>

<template>
  <section class="page">
    <ComicPanel class="page-frame" :rotate="0.6" size="lg">
      <h1>About</h1>
      <p class="lead">Drafting this one — who I am and what I'm building.</p>
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
