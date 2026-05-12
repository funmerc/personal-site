<script setup lang="ts">
  import { useRouteMeta } from '../composables/useRouteMeta'
  import ComicPanel from '../components/ComicPanel.vue'

  useRouteMeta({
    title: 'Not found',
    description: "That page doesn't exist.",
    noindex: true,
  })
</script>

<template>
  <section class="page">
    <ComicPanel class="page-frame" :rotate="-1.5" size="lg">
      <p class="bang"><span class="action-text">404!</span></p>
      <h1>Off-panel</h1>
      <p class="lead">This page doesn't exist — probably never did.</p>
      <RouterLink to="/" class="home-cta">
        <span>← Back to start</span>
      </RouterLink>
    </ComicPanel>
  </section>
</template>

<style scoped>
  .page {
    padding: 2rem 0.5rem 2rem;
    max-width: 42rem;
    margin: 0 auto;
  }

  .page-frame {
    align-items: flex-start;
    gap: 1.25rem;
  }

  .bang {
    margin: 0;
  }

  .bang .action-text {
    font-size: clamp(4.5rem, 13vw, 8rem);
  }

  .lead {
    margin: 0;
    color: var(--color-muted);
    font-family: var(--font-mono), monospace;
    font-size: 1rem;
  }

  .home-cta {
    display: inline-block;
    background: var(--color-signature);
    color: var(--color-ink);
    border: 3px solid var(--color-ink);
    padding: 0.7rem 1.4rem;
    font-family: var(--font-display), cursive;
    font-size: 1.2rem;
    letter-spacing: 0.04em;
    text-decoration: none;
    transform: skew(-12deg) rotate(-1deg);
    transition: transform var(--duration-quick) var(--ease-snap);
    will-change: transform;
  }

  .home-cta span {
    display: inline-block;
    transform: skew(12deg);
  }

  .home-cta:hover {
    transform: skew(-12deg) rotate(-1deg) translate(-3px, -3px);
  }

  .home-cta:focus-visible {
    outline: 3px solid var(--color-ink);
    outline-offset: 4px;
  }
</style>
