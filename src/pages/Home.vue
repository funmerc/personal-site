<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useTheme } from '../composables/useTheme'
  import ComicPanel from '../components/ComicPanel.vue'
  import EntryCard from '../components/EntryCard.vue'
  import ResponsiveImage from '../components/ResponsiveImage.vue'
  import Loader from '../components/Loader.vue'
  import { getRecent } from '../content'
  import statusData from '../data/status.json'
  import type { StatusData } from '../data/types'
  import comicHero from '../assets/comic-hero.avif?w=480;800;1200&format=avif;webp;jpeg&as=picture'
  import comicHeroNight from '../assets/comic-hero-night.avif?w=480;800;1200&format=avif;webp;jpeg&as=picture'

  const { effective } = useTheme()
  const heroPicture = computed(() =>
    effective.value === 'dark' ? comicHeroNight : comicHero,
  )
  const recent = getRecent(2)

  const status = statusData as StatusData
  const statusRows: Array<{ label: string; text: string }> = [
    { label: 'Currently', text: status.currently },
    { label: 'Next', text: status.next },
    { label: 'Future', text: status.future },
  ]

  const loaded = ref(false)
  function onHeroLoad() {
    loaded.value = true
  }
  // Fallback in case @load never fires (cached image with sync decode,
  // or browser that doesn't fire the event). 800ms is past most cold loads.
  onMounted(() => {
    setTimeout(() => {
      loaded.value = true
    }, 800)
  })
</script>

<template>
  <div class="home">
    <Transition name="loader-fade">
      <Loader v-if="!loaded" />
    </Transition>
    <div class="fade-content" :class="{ 'is-loading': !loaded }">
    <section class="hero">
      <div class="grid">
        <ComicPanel class="cell cell-intro" :rotate="-0.8" size="lg">
          <p class="kicker">
            <span class="kicker-tag">Build happiness</span>
          </p>
          <h1 class="name">Jason Rice</h1>
          <p class="tagline">Building products that people enjoy using.</p>
        </ComicPanel>

        <ComicPanel class="cell cell-art" :rotate="0.8" size="sm">
          <ResponsiveImage
            :key="effective"
            :picture="heroPicture"
            alt="Comic-style illustration of Jason"
            sizes="(min-width: 50rem) 45vw, 100vw"
            eager
            @load="onHeroLoad"
          />
        </ComicPanel>

        <ComicPanel class="cell cell-current" tone="ink" :rotate="-0.4" size="md">
          <ul class="status">
            <li v-for="row in statusRows" :key="row.label" class="status-row">
              <span class="status-label">{{ row.label }}</span>
              <span class="status-text">{{ row.text }}</span>
            </li>
          </ul>
        </ComicPanel>
      </div>
    </section>

    <section v-if="recent.length" class="featured">
      <h2 class="section-title">Recent</h2>
      <div class="featured-list">
        <EntryCard
          v-for="item in recent"
          :key="`${item.kind}/${item.slug}`"
          :to="`/${item.kind}/${item.slug}`"
          :title="item.title"
          :summary="item.summary"
          :date="item.date"
        >
          <ul v-if="'tech' in item && item.tech.length" class="chips">
            <li v-for="t in item.tech" :key="t" class="chip">{{ t }}</li>
          </ul>
        </EntryCard>
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
  .home {
    position: relative;
  }

  .hero {
    padding: 1rem 0.5rem 1.5rem;
  }

  .loader-fade-leave-active {
    transition: opacity 250ms ease-out;
  }

  .loader-fade-leave-to {
    opacity: 0;
  }

  .featured {
    padding: 0.5rem 0.5rem 2rem;
  }

  .section-title {
    display: inline-block;
    position: relative;
    font-family: var(--font-display), cursive;
    font-size: 2rem;
    letter-spacing: 0.02em;
    margin: 0 0 1rem;
  }

  .section-title::after {
    content: '';
    position: absolute;
    bottom: -0.15em;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--color-signature);
  }

  .featured-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .chips {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  @media (min-width: 50rem) {
    .featured-list {
      grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    }
  }

  .grid {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    grid-template-areas:
      'intro art'
      'current art';
    gap: 1.75rem;
    align-items: stretch;
  }

  .cell-intro {
    grid-area: intro;
    gap: 1rem;
    justify-content: center;
  }

  .cell-art {
    grid-area: art;
    align-items: center;
    justify-content: center;
  }

  .cell-current {
    grid-area: current;
    gap: 1.25rem;
  }

  .kicker {
    margin: 0;
  }

  .kicker-tag {
    display: inline-block;
    background: var(--color-ink);
    color: var(--color-paper);
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.25rem 0.6rem;
    transform: skew(-12deg) rotate(-1deg);
  }

  .name {
    font-size: clamp(3rem, 8vw, 6rem);
    line-height: 0.9;
    margin: 0;
  }

  .tagline {
    font-size: clamp(1.1rem, 2vw, 1.55rem);
    font-weight: 500;
    margin: 0;
    max-width: 32ch;
  }

  .cell-art img {
    display: block;
    width: 100%;
    height: auto;
    max-height: clamp(18rem, 55vh, 34rem);
    object-fit: contain;
  }

  /* Status box on the ink-tone panel: rows for Currently / Next / Future,
     each with a signature-red badge and mono text. */
  .status {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .status-row {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.6rem;
    font-family: var(--font-mono), monospace;
    font-size: 0.95rem;
  }

  .status-label {
    display: inline-block;
    background: var(--color-signature);
    color: var(--color-ink);
    border: 2px solid var(--color-ink);
    padding: 0.15rem 0.5rem;
    font-family: var(--font-display), cursive;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    transform: skew(-12deg) rotate(-1.5deg);
    /* Keep each label the same width so the text columns line up. */
    min-width: 5.5rem;
    text-align: center;
  }

  .status-text {
    flex: 1;
    min-width: 0;
  }

  @media (max-width: 50rem) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        'intro'
        'art'
        'current';
      gap: 1.25rem;
    }

    .cell-art img {
      max-height: 18rem;
    }
  }
</style>
