<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useTheme } from '../composables/useTheme'
  import IndexLayout from '../components/IndexLayout.vue'
  import ComicPanel from '../components/ComicPanel.vue'
  import EntryCard from '../components/EntryCard.vue'
  import ResponsiveImage from '../components/ResponsiveImage.vue'
  import { getDemos } from '../content'
  import banner from '../assets/comic-hero-zooming.avif?w=480;800;1200&format=avif;webp;jpeg&as=picture'
  import bannerNight from '../assets/comic-hero-zooming-night.avif?w=480;800;1200&format=avif;webp;jpeg&as=picture'

  const demos = getDemos()

  const { effective } = useTheme()
  const bannerPicture = computed(() =>
    effective.value === 'dark' ? bannerNight : banner,
  )

  const loaded = ref(false)
  function onBannerLoad() {
    loaded.value = true
  }
  onMounted(() => {
    setTimeout(() => {
      loaded.value = true
    }, 800)
  })

  useRouteMeta({
    title: 'Demos',
    description: 'Quick experiments and prototypes.',
  })
</script>

<template>
  <IndexLayout title="Demos" :rotate-title="0.5" :loading="!loaded">
    <ComicPanel class="banner" :rotate="-0.4" size="sm">
      <ResponsiveImage
        :key="effective"
        :picture="bannerPicture"
        alt="Comic-style banner illustration"
        sizes="(min-width: 56rem) 56rem, 100vw"
        @load="onBannerLoad"
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
</style>
