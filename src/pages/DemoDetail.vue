<script setup lang="ts">
  import { computed, ref, watch, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useRouteMeta } from '../composables/useRouteMeta'
  import { useProseLinks } from '../composables/useProseLinks'
  import { useTheme } from '../composables/useTheme'
  import ComicPanel from '../components/ComicPanel.vue'
  import Loader from '../components/Loader.vue'
  import { getDemo, type Demo } from '../api'
  import { formatDate } from '../utils/formatDate'
  import { renderMarkdown } from '../utils/markdown'

  const route = useRoute()
  const demo = ref<Demo | null>(null)
  const bodyHtml = ref('')
  const loaded = ref(false)

  async function loadDemo(slug: string) {
    loaded.value = false
    demo.value = null
    bodyHtml.value = ''
    const result = await getDemo(slug)
    demo.value = result ?? null
    if (result?.body) {
      bodyHtml.value = await renderMarkdown(result.body)
    }
    loaded.value = true
  }

  watch(
    () => route.params.slug,
    (slug) => {
      if (typeof slug === 'string' && slug.length) {
        loadDemo(slug)
      }
    },
    { immediate: true },
  )

  const proseEl = ref<HTMLElement | null>(null)
  useProseLinks(proseEl)

  const LABS_PROD_ORIGIN = 'https://funmerc.github.io/labs'
  const LABS_DEV_ORIGIN = 'http://localhost:5174'

  const embedFrame = ref<HTMLIFrameElement | null>(null)
  const { effective } = useTheme()

  const embedSrc = computed(() => {
    const src = demo.value?.embed
    if (!src) {
      return ''
    }
    if (import.meta.env.DEV && src.startsWith(LABS_PROD_ORIGIN)) {
      return LABS_DEV_ORIGIN + src.slice(LABS_PROD_ORIGIN.length)
    }
    return src
  })

  // Probe local labs server in dev so we can show a friendly placeholder
  // instead of the browser's "can't reach this site" page inside the iframe.
  type EmbedProbe = 'pending' | 'ok' | 'failed'
  const embedProbe = ref<EmbedProbe>('ok')

  watchEffect(async () => {
    const src = embedSrc.value
    if (!src) {
      embedProbe.value = 'ok'
      return
    }
    if (!import.meta.env.DEV || !src.startsWith(LABS_DEV_ORIGIN)) {
      embedProbe.value = 'ok'
      return
    }
    embedProbe.value = 'pending'
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 1500)
      await fetch(src, { mode: 'no-cors', signal: controller.signal })
      clearTimeout(timer)
      embedProbe.value = 'ok'
    } catch {
      embedProbe.value = 'failed'
    }
  })

  function postTheme() {
    embedFrame.value?.contentWindow?.postMessage(
      { theme: effective.value },
      '*',
    )
  }

  function onEmbedLoad() {
    postTheme()
  }

  watch(effective, () => {
    postTheme()
  })

  useRouteMeta({
    title: () => demo.value?.title ?? 'Demo not found',
    description: () => demo.value?.summary ?? 'No demo with that slug.',
  })
</script>

<template>
  <section class="page">
    <div class="fade-content" :class="{ 'is-loading': !loaded }">
    <RouterLink v-if="demo" to="/demos" class="back-tab">← Demos</RouterLink>
    <ComicPanel class="page-frame" :rotate="-0.6" size="lg">
      <template v-if="demo">
        <header class="head">
          <h1>{{ demo.title }}</h1>
          <p class="meta">
            <time :datetime="demo.date">{{ formatDate(demo.date) }}</time>
          </p>
          <p class="summary">{{ demo.summary }}</p>
        </header>

        <ul v-if="demo.tech.length" class="chips">
          <li v-for="tech in demo.tech" :key="tech" class="chip">{{ tech }}</li>
        </ul>

        <div
          v-if="demo.links && (demo.links.live || demo.links.repo)"
          class="links"
        >
          <a
            v-if="demo.links.live"
            :href="demo.links.live"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Live →
          </a>
          <a
            v-if="demo.links.repo"
            :href="demo.links.repo"
            target="_blank"
            rel="noopener"
            class="ext"
          >
            Repo →
          </a>
        </div>

        <div v-if="bodyHtml" ref="proseEl" class="prose" v-html="bodyHtml" />

        <div v-if="embedSrc" class="embed">
          <iframe
            v-if="embedProbe === 'ok'"
            ref="embedFrame"
            :src="embedSrc"
            :title="`${demo.title} — live demo`"
            loading="lazy"
            referrerpolicy="no-referrer"
            @load="onEmbedLoad"
          />
          <div v-else-if="embedProbe === 'failed'" class="embed-placeholder">
            <p class="embed-placeholder__title">Local labs server isn't running.</p>
            <p class="embed-placeholder__hint">
              Start it so it serves <code>{{ embedSrc }}</code>.
            </p>
          </div>
          <div v-else class="embed-placeholder embed-placeholder--probing">
            <p>Connecting to local labs…</p>
          </div>
        </div>

        <ul v-if="demo.tags?.length" class="tags">
          <li v-for="tag in demo.tags" :key="tag" class="chip">{{ tag }}</li>
        </ul>
      </template>
      <template v-else-if="loaded">
        <h1>Not found</h1>
        <p class="lead">
          No demo with that slug.
          <RouterLink to="/demos" class="inline-back">← Back to demos</RouterLink>
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

  .embed {
    margin-top: 1.5rem;
    border: 3px solid var(--color-ink);
    background: var(--color-paper);
    overflow: hidden;
  }

  .embed iframe {
    display: block;
    width: 100%;
    height: min(80vh, 720px);
    border: 0;
  }

  .embed-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    min-height: 12rem;
    padding: 2rem 1.5rem;
    font-family: var(--font-mono), monospace;
    text-align: center;
  }

  .embed-placeholder__title {
    font-weight: 700;
  }

  .embed-placeholder__hint {
    opacity: 0.8;
  }

  .embed-placeholder code {
    word-break: break-all;
  }

  .embed-placeholder--probing {
    opacity: 0.6;
  }
</style>
