<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import IndexLayout from '../components/IndexLayout.vue'
  import ComicPanel from '../components/ComicPanel.vue'
  import EntryCard from '../components/EntryCard.vue'
  import { getDemos } from '../content'

  const demos = getDemos()

  useRouteMeta({
    title: 'Demos',
    description: 'Quick experiments and prototypes.',
  })
</script>

<template>
  <IndexLayout title="Demos" :rotate-title="0.5">
    <ComicPanel v-if="!demos.length" :rotate="0.3" size="md">
      <p class="lead">First batch of experiments is being prepped.</p>
    </ComicPanel>
    <EntryCard
      v-for="(d, i) in demos"
      :key="d.slug"
      :to="`/demos/${d.slug}`"
      :title="d.title"
      :summary="d.summary"
      :date="d.date"
      :tone="i % 2 === 0 ? 'paper' : 'ink'"
      :rotate="i % 2 === 0 ? -0.4 : 0.4"
    >
      <ul v-if="d.tech.length" class="chips">
        <li v-for="t in d.tech" :key="t" class="chip">{{ t }}</li>
      </ul>
    </EntryCard>
  </IndexLayout>
</template>

<style scoped>
  .lead {
    margin: 0;
    color: var(--color-muted);
    font-family: var(--font-mono), monospace;
    font-size: 0.95rem;
  }

  .chips {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }
</style>
