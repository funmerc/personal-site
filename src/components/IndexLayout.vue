<script setup lang="ts">
  import ComicPanel from './ComicPanel.vue'

  withDefaults(
    defineProps<{
      title: string
      rotateTitle?: number
    }>(),
    {
      rotateTitle: -0.6,
    },
  )
</script>

<template>
  <section class="page">
    <ComicPanel class="title-panel" :rotate="rotateTitle" size="md">
      <h1>{{ title }}</h1>
    </ComicPanel>
    <div class="body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
  .page {
    padding: 1.5rem 0.5rem 2rem;
    max-width: 56rem;
    margin: 0 auto;
  }

  .title-panel {
    max-width: max-content;
    margin: 0 0 1.75rem;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
</style>
