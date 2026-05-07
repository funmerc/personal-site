<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'

  useRouteMeta({
    title: 'Not found',
    description: "That page doesn't exist.",
    noindex: true,
  })
</script>

<template>
  <section>
    <h1>Not found</h1>
  </section>
</template>
