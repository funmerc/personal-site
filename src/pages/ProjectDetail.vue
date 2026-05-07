<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'

  // Placeholder until the projects data layer lands; detail pages will then
  // derive title/description from the loaded entry.
  useRouteMeta({
    title: 'Project',
    description: 'Project writeup.',
  })
</script>

<template>
  <section>
    <h1>Project detail</h1>
  </section>
</template>
