<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'

  useRouteMeta({
    title: 'Demo',
    description: 'Demo writeup.',
  })
</script>

<template>
  <section>
    <h1>Demo detail</h1>
  </section>
</template>
