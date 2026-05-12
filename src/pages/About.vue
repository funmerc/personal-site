<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useTheme } from '../composables/useTheme'
  import IndexLayout from '../components/IndexLayout.vue'
  import ComicPanel from '../components/ComicPanel.vue'
  import ResponsiveImage from '../components/ResponsiveImage.vue'
  import aboutData from '../data/about.json'
  import educationData from '../data/education.json'
  import workData from '../data/work_experience.json'
  import type { AboutData, EducationData, WorkRole } from '../data/types'
  import banner from '../assets/comic-hero-banner.avif?w=480;800;1200&format=avif;webp;jpeg&as=picture'
  import bannerNight from '../assets/comic-hero-banner-night.avif?w=480;800;1200&format=avif;webp;jpeg&as=picture'

  const about = aboutData as AboutData
  const education = educationData as EducationData
  const work = workData as WorkRole[]

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
    title: 'About',
    description: "Who I am and what I'm working on.",
  })
</script>

<template>
  <IndexLayout title="About" :rotate-title="0.6" :loading="!loaded">
    <ComicPanel class="banner" :rotate="-0.4" size="sm">
      <ResponsiveImage
        :key="effective"
        :picture="bannerPicture"
        alt="Comic-style banner illustration"
        sizes="(min-width: 56rem) 56rem, 100vw"
        @load="onBannerLoad"
      />
    </ComicPanel>

    <div class="grid">
      <ComicPanel class="section" :rotate="-0.3" size="md">
        <h2 class="section-title">Why</h2>
        <p class="prose">{{ about.why }}</p>
      </ComicPanel>

      <ComicPanel class="section" :rotate="0.4" size="md">
        <h2 class="section-title">Where I studied</h2>
        <article
          v-for="item in education.items"
          :key="item.name + item.graduation_date"
          class="entry"
        >
          <header class="entry-head">
            <h3 class="entry-title">{{ item.degree_title }}</h3>
            <p class="entry-meta">
              <span>{{ item.name }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ item.graduation_date }}</span>
            </p>
          </header>
          <div class="entry-section">
            <h4 class="entry-section-label">Relevant coursework</h4>
            <ul class="chips">
              <li v-for="c in item.relevant_coursework" :key="c" class="chip">
                {{ c }}
              </li>
            </ul>
          </div>
        </article>
      </ComicPanel>

      <ComicPanel class="section full" :rotate="-0.2" size="md">
        <h2 class="section-title">What I'm into</h2>
        <h3 class="sub">Interests</h3>
        <ul class="chips">
          <li v-for="i in about.interests" :key="i" class="chip">{{ i }}</li>
        </ul>
        <h3 class="sub">Goals</h3>
        <ul class="chips">
          <li v-for="g in about.goals" :key="g" class="chip">{{ g }}</li>
        </ul>
      </ComicPanel>

      <ComicPanel class="section full" :rotate="0.3" size="md">
        <h2 class="section-title">Where I've worked</h2>
        <article
          v-for="role in work"
          :key="role.companyTitle + role.workDateRange"
          class="entry"
        >
          <header class="entry-head">
            <h3 class="entry-title">{{ role.companyTitle }}</h3>
            <p class="entry-meta">
              <span>{{ role.jobTitle }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ role.workDateRange }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ role.jobLocation }}</span>
            </p>
          </header>
          <div
            v-for="section in role.sections"
            :key="section.label"
            class="entry-section"
          >
            <h4 class="entry-section-label">{{ section.label }}</h4>
            <ul v-if="section.label === 'Key Technologies'" class="chips">
              <li v-for="v in section.values" :key="v" class="chip">{{ v }}</li>
            </ul>
            <ul v-else class="bullets">
              <li v-for="v in section.values" :key="v">{{ v }}</li>
            </ul>
          </div>
        </article>
      </ComicPanel>
    </div>
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

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  .full {
    grid-column: 1 / -1;
  }

  @media (max-width: 50rem) {
    .grid {
      grid-template-columns: 1fr;
    }
  }

  .section {
    gap: 0.75rem;
  }

  .section-title {
    margin: 0;
    font-family: var(--font-display), cursive;
    font-size: 1.5rem;
    letter-spacing: 0.02em;
  }

  .prose {
    margin: 0;
    font-size: 1rem;
    line-height: 1.7;
  }

  .sub {
    margin: 0.25rem 0 0;
    font-family: var(--font-display), cursive;
    font-size: 0.95rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-muted);
  }

  .sub:first-of-type {
    margin-top: 0;
  }

  .chips {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .bullets {
    margin: 0;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-size: 0.95rem;
    line-height: 1.55;
  }

  .entry {
    padding-bottom: 1rem;
    border-bottom: 1px dashed var(--color-halftone);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .entry:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }

  .entry-head {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .entry-title {
    margin: 0;
    font-family: var(--font-display), cursive;
    font-size: 1.25rem;
    letter-spacing: 0.02em;
  }

  .entry-meta {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    color: var(--color-muted);
    font-family: var(--font-mono), monospace;
    font-size: 0.8rem;
  }

  .entry-section {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .entry-section-label {
    margin: 0;
    font-family: var(--font-display), cursive;
    font-size: 0.85rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--color-muted);
  }
</style>
