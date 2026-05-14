<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import IndexLayout from '../components/IndexLayout.vue'
  import ComicPanel from '../components/ComicPanel.vue'
  import usesData from '../data/uses.json'
  import type { UsesData } from '../data/types'

  const uses = usesData as UsesData

  useRouteMeta({
    title: 'Uses',
    description: 'The tools, hardware, and setup I work with.',
  })

  const loaded = ref(false)
  onMounted(() => {
    requestAnimationFrame(() => {
      loaded.value = true
    })
  })
</script>

<template>
  <IndexLayout title="Uses" :rotate-title="-0.4" :loading="!loaded">
    <ComicPanel
      v-for="(section, index) in uses.sections"
      :key="section.label"
      :tone="index % 2 === 0 ? 'paper' : 'ink'"
      :rotate="index % 2 === 0 ? -0.4 : 0.4"
      size="md"
      class="section"
    >
      <h2 class="section-label">{{ section.label }}</h2>
      <ul class="chips">
        <li v-for="item in section.items" :key="item" class="chip">{{ item }}</li>
      </ul>
    </ComicPanel>
  </IndexLayout>
</template>

<style scoped>
  .section {
    gap: 0.6rem;
  }

  .section-label {
    margin: 0;
    font-family: var(--font-display), cursive;
    font-size: 1rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: color-mix(in srgb, currentColor 65%, transparent);
  }

  .chips {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
</style>
