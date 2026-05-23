<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import IndexLayout from '../components/IndexLayout.vue'
  import EntryCard from '../components/EntryCard.vue'
  import { getProjects, type Project } from '../api'

  const projects = ref<Project[]>([])
  const loaded = ref(false)

  useRouteMeta({
    title: 'Projects',
    description: "Things I've built and shipped, with the why behind each one.",
  })

  onMounted(async () => {
    projects.value = await getProjects()
    loaded.value = true
  })
</script>

<template>
  <IndexLayout title="Projects" :rotate-title="-0.5" :loading="!loaded">
    <p v-if="loaded && !projects.length" class="lead">First entries are being written up.</p>
    <EntryCard
      v-for="(project, index) in projects"
      :key="project.slug"
      :to="`/projects/${project.slug}`"
      :title="project.title"
      :summary="project.summary"
      :date="project.date"
      :tone="index % 2 === 0 ? 'paper' : 'ink'"
      :rotate="index % 2 === 0 ? -0.4 : 0.4"
    >
      <ul v-if="project.tech.length" class="chips">
        <li v-for="tech in project.tech" :key="tech" class="chip">{{ tech }}</li>
      </ul>
    </EntryCard>
  </IndexLayout>
</template>
