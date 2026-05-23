<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useTheme } from '../composables/useTheme'
  import IndexLayout from '../components/IndexLayout.vue'
  import ComicPanel from '../components/ComicPanel.vue'
  import EntryCard from '../components/EntryCard.vue'
  import ResponsiveImage from '../components/ResponsiveImage.vue'
  import { getDemos, type Demo } from '../api'
  import banner from '../assets/comic-hero-zooming.avif?w=480;800;1200&format=avif;webp;jpeg&as=picture'
  import bannerNight from '../assets/comic-hero-zooming-night.avif?w=480;800;1200&format=avif;webp;jpeg&as=picture'

  const demos = ref<Demo[]>([])

  const { effective } = useTheme()
  const bannerPicture = computed(() =>
    effective.value === 'dark' ? bannerNight : banner,
  )

  // Two gates: API data and the banner image. Loader hides only once both are
  // ready (or the safety timer flips the image gate).
  const dataReady = ref(false)
  const bannerReady = ref(false)
  const loaded = computed(() => dataReady.value && bannerReady.value)

  function onBannerLoad() {
    bannerReady.value = true
  }

  onMounted(async () => {
    setTimeout(() => {
      bannerReady.value = true
    }, 800)
    demos.value = await getDemos()
    dataReady.value = true
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

    <ComicPanel v-if="loaded && !demos.length" :rotate="0.3" size="md">
      <p class="lead">First batch of experiments is being prepped.</p>
    </ComicPanel>
    <EntryCard
      v-for="(demo, index) in demos"
      :key="demo.slug"
      :to="`/demos/${demo.slug}`"
      :title="demo.title"
      :summary="demo.summary"
      :date="demo.date"
      :tone="index % 2 === 0 ? 'paper' : 'ink'"
      :rotate="index % 2 === 0 ? -0.4 : 0.4"
    >
      <ul
        v-if="demo.tech.length || demo.tags?.length"
        class="chips"
      >
        <li
          v-for="tag in [...demo.tech, ...(demo.tags ?? [])]"
          :key="tag"
          class="chip"
        >
          {{ tag }}
        </li>
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
