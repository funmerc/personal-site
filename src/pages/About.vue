<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'

  useRouteMeta({
    title: 'About',
    description: "Who I am and what I'm working on.",
  })
</script>

<template>
  <section>
    <h1>About</h1>
  </section>
</template>
