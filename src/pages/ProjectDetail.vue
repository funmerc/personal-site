<script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useProseLinks } from '../composables/useProseLinks'
  import ComicPanel from '../components/ComicPanel.vue'
  import Loader from '../components/Loader.vue'
  import { getProject } from '../content'
  import { formatDate } from '../utils/formatDate'
  import { renderMarkdown } from '../utils/markdown'

  const route = useRoute()
  const project = computed(() => getProject(String(route.params.slug)))

  const bodyHtml = ref('')
  const loaded = ref(false)
  watchEffect(async () => {
    if (!project.value?.body) {
      bodyHtml.value = ''
      loaded.value = true
      return
    }
    bodyHtml.value = await renderMarkdown(project.value.body)
    loaded.value = true
  })

  const proseEl = ref<HTMLElement | null>(null)
  useProseLinks(proseEl)

  useRouteMeta({
    title: () => project.value?.title ?? 'Project not found',
    description: () => project.value?.summary ?? 'No project with that slug.',
  })
</script>

<template>
  <section class="page">
    <div class="fade-content" :class="{ 'is-loading': !loaded }">
    <RouterLink v-if="project" to="/projects" class="back-tab">← Projects</RouterLink>
    <ComicPanel class="page-frame" :rotate="0.5" size="lg">
      <template v-if="project">
        <header class="head">
          <h1>{{ project.title }}</h1>
          <p class="meta">
            <time :datetime="project.date">{{ formatDate(project.date) }}</time>
            <template v-if="project.period">
              <span aria-hidden="true">·</span>
              <span>{{ project.period }}</span>
            </template>
            <template v-if="project.role">
              <span aria-hidden="true">·</span>
              <span>{{ project.role }}</span>
            </template>
          </p>
          <p class="summary">{{ project.summary }}</p>
        </header>

        <ul v-if="project.tech.length" class="chips">
          <li v-for="t in project.tech" :key="t" class="chip">{{ t }}</li>
        </ul>

        <div
          v-if="project.links && (project.links.live || project.links.repo || project.links.demo)"
          class="links"
        >
          <a
            v-if="project.links.live"
            :href="project.links.live"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Live →
          </a>
          <a
            v-if="project.links.repo"
            :href="project.links.repo"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Repo →
          </a>
          <a
            v-if="project.links.demo"
            :href="project.links.demo"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Demo →
          </a>
        </div>

        <div v-if="bodyHtml" ref="proseEl" class="prose" v-html="bodyHtml" />

        <ul v-if="project.tags?.length" class="tags">
          <li v-for="t in project.tags" :key="t" class="chip">{{ t }}</li>
        </ul>
      </template>
      <template v-else>
        <h1>Not found</h1>
        <p class="lead">
          No project with that slug.
          <RouterLink to="/projects" class="inline-back">← Back to projects</RouterLink>
        </p>
      </template>
    </ComicPanel>
    </div>
    <Transition name="loader-fade">
      <Loader v-if="!loaded" />
    </Transition>
  </section>
</template>

<style scoped>
  .loader-fade-leave-active {
    transition: opacity 250ms ease-out;
  }

  .loader-fade-leave-to {
    opacity: 0;
  }
</style>

