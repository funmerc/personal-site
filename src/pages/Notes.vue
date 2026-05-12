<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import IndexLayout from '../components/IndexLayout.vue'
  import EntryCard from '../components/EntryCard.vue'
  import { getNotes } from '../content'

  const notes = getNotes()

  useRouteMeta({
    title: 'Notes',
    description: 'Writing on engineering and building.',
  })
</script>

<template>
  <IndexLayout title="Notes" :rotate-title="-0.8">
    <p v-if="!notes.length" class="lead">First posts are being drafted.</p>
    <EntryCard
      v-for="(n, i) in notes"
      :key="n.slug"
      :to="`/notes/${n.slug}`"
      :title="n.title"
      :summary="n.summary"
      :date="n.date"
      :tone="i % 2 === 0 ? 'paper' : 'ink'"
      :rotate="i % 2 === 0 ? -0.4 : 0.4"
    />
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
