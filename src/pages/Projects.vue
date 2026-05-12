<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import IndexLayout from '../components/IndexLayout.vue'
  import EntryCard from '../components/EntryCard.vue'
  import { getProjects } from '../content'

  const projects = getProjects()

  useRouteMeta({
    title: 'Projects',
    description: "Things I've built and shipped, with the why behind each one.",
  })

  const loaded = ref(false)
  onMounted(() => {
    requestAnimationFrame(() => {
      loaded.value = true
    })
  })
</script>

<template>
  <IndexLayout title="Projects" :rotate-title="-0.5" :loading="!loaded">
    <p v-if="!projects.length" class="lead">First entries are being written up.</p>
    <EntryCard
      v-for="(p, i) in projects"
      :key="p.slug"
      :to="`/projects/${p.slug}`"
      :title="p.title"
      :summary="p.summary"
      :date="p.date"
      :tone="i % 2 === 0 ? 'paper' : 'ink'"
      :rotate="i % 2 === 0 ? -0.4 : 0.4"
    >
      <ul v-if="p.tech.length" class="chips">
        <li v-for="t in p.tech" :key="t" class="chip">{{ t }}</li>
      </ul>
    </EntryCard>
  </IndexLayout>
</template>
