<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import IndexLayout from '../components/IndexLayout.vue'
  import ComicPanel from '../components/ComicPanel.vue'

  useRouteMeta({
    title: 'Uses',
    description: 'The tools, hardware, and setup I work with.',
  })
</script>

<template>
  <IndexLayout title="Uses" :rotate-title="-0.4">
    <ComicPanel :rotate="0.3" size="md">
      <p class="lead">Sorting through the rig.</p>
    </ComicPanel>
  </IndexLayout>
</template>

<style scoped>
  .lead {
    margin: 0;
    color: var(--color-muted);
    font-family: var(--font-mono), monospace;
    font-size: 0.95rem;
  }
</style>
