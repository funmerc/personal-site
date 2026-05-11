<script setup lang="ts">
  import { computed } from 'vue'
  import { useTheme } from '../composables/useTheme'
  import ComicPanel from '../components/ComicPanel.vue'
  import comicHero from '../assets/comic-hero.png'
  import comicHeroNight from '../assets/comic-hero-night.png'

  const { effective } = useTheme()
  const heroSrc = computed(() =>
    effective.value === 'dark' ? comicHeroNight : comicHero,
  )
</script>

<template>
  <section class="hero">
    <div class="grid">
      <ComicPanel class="cell cell-intro" :rotate="-0.8" size="lg">
        <p class="kicker">
          <span class="kicker-tag">Working in public</span>
        </p>
        <h1 class="name">Jason Rice</h1>
        <p class="tagline">Building products that people enjoy using.</p>
      </ComicPanel>

      <ComicPanel class="cell cell-art" :rotate="0.8" size="sm">
        <img
          :key="effective"
          :src="heroSrc"
          alt="Comic-style illustration of Jason"
          width="896"
          height="1195"
        />
      </ComicPanel>

      <!-- Placeholder until a data layer lands — keep this short and current. -->
      <ComicPanel class="cell cell-current" tone="ink" :rotate="-0.4" size="md">
        <p class="currently">
          <span class="currently-label">Currently</span>
          <span>building this site &amp; what comes next.</span>
        </p>
        <div class="cta">
          <RouterLink to="/projects" class="cta-primary">
            <span>See projects</span>
          </RouterLink>
          <RouterLink to="/about" class="cta-secondary">
            <span>About me</span>
          </RouterLink>
        </div>
      </ComicPanel>
    </div>
  </section>
</template>

<style scoped>
  .hero {
    padding: 1rem 0.5rem 2rem;
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

  /* Inverted (ink-tone) panel: text inherits paper color from the panel.
     Only the signature label and the cta backgrounds override that. */
  .currently {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-mono), monospace;
    font-size: 0.95rem;
    margin: 0;
  }

  .currently-label {
    display: inline-block;
    background: var(--color-signature);
    color: var(--color-ink);
    border: 2px solid var(--color-ink);
    padding: 0.15rem 0.5rem;
    font-family: var(--font-display), cursive;
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    transform: skew(-12deg) rotate(-1.5deg);
  }

  .cta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
  }

  .cta-primary,
  .cta-secondary {
    display: inline-block;
    border: 3px solid var(--color-ink);
    padding: 0.7rem 1.4rem;
    font-family: var(--font-display), cursive;
    font-size: 1.2rem;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition:
      transform var(--duration-quick) var(--ease-snap),
      background var(--duration-quick) var(--ease-snap),
      color var(--duration-quick) var(--ease-snap);
    will-change: transform;
  }

  .cta-primary span,
  .cta-secondary span {
    display: inline-block;
    transform: skew(12deg);
  }

  .cta-primary {
    background: var(--color-signature);
    color: var(--color-ink);
    transform: skew(-12deg) rotate(-1deg);
  }

  .cta-primary:hover {
    transform: skew(-12deg) rotate(-1deg) translate(-3px, -3px);
  }

  .cta-secondary {
    background: var(--color-paper);
    color: var(--color-ink);
    transform: skew(-12deg) rotate(0.5deg);
  }

  .cta-secondary:hover {
    background: var(--color-ink);
    color: var(--color-paper);
    transform: skew(-12deg) rotate(0.5deg) translate(-3px, -3px);
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
