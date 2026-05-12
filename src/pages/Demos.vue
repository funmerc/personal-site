<script setup lang="ts">
  import { computed } from 'vue'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useTheme } from '../composables/useTheme'
  import IndexLayout from '../components/IndexLayout.vue'
  import ComicPanel from '../components/ComicPanel.vue'
  import EntryCard from '../components/EntryCard.vue'
  import { getDemos } from '../content'
  import banner from '../assets/comic-hero-zooming.avif'
  import bannerNight from '../assets/comic-hero-zooming-night.avif'

  const demos = getDemos()

  const { effective } = useTheme()
  const bannerSrc = computed(() =>
    effective.value === 'dark' ? bannerNight : banner,
  )

  useRouteMeta({
    title: 'Demos',
    description: 'Quick experiments and prototypes.',
  })
</script>

<template>
  <IndexLayout title="Demos" :rotate-title="0.5">
    <ComicPanel class="banner" :rotate="-0.4" size="sm">
      <img
        :key="effective"
        :src="bannerSrc"
        alt="Comic-style banner illustration"
      />
    </ComicPanel>

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
  .banner {
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .banner img {
    display: block;
    width: 100%;
    height: auto;
  }

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
