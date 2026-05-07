<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'

  useRouteMeta({
    title: 'Note',
    description: 'Note writeup.',
  })
</script>

<template>
  <section>
    <h1>Note detail</h1>
  </section>
</template>
