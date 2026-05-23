<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import IndexLayout from '../components/IndexLayout.vue'
  import EntryCard from '../components/EntryCard.vue'
  import { getNotes, type Note } from '../api'

  const notes = ref<Note[]>([])
  const loaded = ref(false)

  useRouteMeta({
    title: 'Notes',
    description: 'Writing on engineering and building.',
  })

  onMounted(async () => {
    notes.value = await getNotes()
    loaded.value = true
  })
</script>

<template>
  <IndexLayout title="Notes" :rotate-title="-0.8" :loading="!loaded">
    <p v-if="loaded && !notes.length" class="lead">First posts are being drafted.</p>
    <EntryCard
      v-for="(note, index) in notes"
      :key="note.slug"
      :to="`/notes/${note.slug}`"
      :title="note.title"
      :summary="note.summary"
      :date="note.date"
      :tone="index % 2 === 0 ? 'paper' : 'ink'"
      :rotate="index % 2 === 0 ? -0.4 : 0.4"
    />
  </IndexLayout>
</template>
