<script setup lang="ts">
  import { useNavMenu } from '../composables/useNavMenu'

  const links = [
    { to: '/projects', label: 'Projects' },
    { to: '/demos', label: 'Demos' },
    { to: '/notes', label: 'Notes' },
    { to: '/about', label: 'About' },
    { to: '/uses', label: 'Uses' },
  ]

  const { open, animating, toggle, close } = useNavMenu()
</script>

<template>
  <header>
    <div
      class="backdrop"
      :class="{ 'is-open': open, 'is-animating': animating }"
      aria-hidden="true"
      @click="close"
    />
    <div class="bar">
      <RouterLink to="/" class="wordmark">Jason Rice</RouterLink>
      <button
        type="button"
        class="hamburger"
        :class="{ 'is-open': open }"
        :aria-expanded="open"
        aria-controls="primary-menu"
        aria-label="Toggle menu"
        @click="toggle"
      >
        <span class="hamburger-icon">
          <span class="hamburger-line" />
          <span class="hamburger-line" />
          <span class="hamburger-line" />
        </span>
      </button>
      <ul
        id="primary-menu"
        class="menu"
        :class="{ 'is-open': open, 'is-animating': animating }"
      >
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="link.to" class="link">
            <span>{{ link.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
  header {
    padding: 1.25rem 1rem 0;
  }

  .bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    max-width: 80rem;
    margin: 0 auto;
    flex-wrap: wrap;
  }

  /* Wordmark: rectangular ink panel, slight tilt, inverted text */
  .wordmark {
    display: inline-block;
    background: var(--color-ink);
    color: var(--color-paper);
    border: 3px solid var(--color-ink);
    padding: 0.5rem 1rem;
    font-family: var(--font-display), cursive;
    font-size: 1.75rem;
    letter-spacing: 0.04em;
    text-decoration: none;
    transform: rotate(-1.5deg);
    transition: transform var(--duration-quick) var(--ease-snap);
    will-change: transform;
  }

  .wordmark:hover {
    transform: rotate(-1.5deg) translate(-2px, -2px);
  }

  .wordmark:focus-visible {
    outline: 3px solid var(--color-signature);
    outline-offset: 4px;
  }

  /* Hamburger: parallelogram tile with three skewed ink bars.
     Hidden by default — only appears at <50rem. */
  .hamburger {
    display: none;
    align-items: center;
    justify-content: center;
    background: var(--color-paper);
    color: var(--color-ink);
    border: 3px solid var(--color-ink);
    padding: 0.5rem 0.85rem;
    cursor: pointer;
    font-family: inherit;
    transform: skew(-12deg) rotate(-0.5deg);
    transition: transform var(--duration-quick) var(--ease-snap);
    will-change: transform;
  }

  .hamburger:hover {
    transform: skew(-12deg) rotate(-0.5deg) translate(-2px, -2px);
  }

  .hamburger:focus-visible {
    outline: 3px solid var(--color-signature);
    outline-offset: 4px;
  }

  /* Counter-skew the icon contents so the bars themselves stay axis-aligned */
  .hamburger-icon {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    transform: skew(12deg);
  }

  .hamburger-line {
    display: block;
    width: 22px;
    height: 3px;
    background: var(--color-ink);
    transition:
      transform var(--duration-quick) var(--ease-snap),
      opacity var(--duration-quick);
  }

  /* X transform when open */
  .hamburger.is-open .hamburger-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger.is-open .hamburger-line:nth-child(2) {
    opacity: 0;
  }
  .hamburger.is-open .hamburger-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Menu: separate parallelogram panels with gaps */
  .menu {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .link {
    display: inline-block;
    background: var(--color-paper);
    color: var(--color-ink);
    border: 3px solid var(--color-ink);
    padding: 0.45rem 1rem;
    font-weight: 600;
    text-decoration: none;
    transform: skew(-12deg);
    transition:
      background var(--duration-quick) var(--ease-snap),
      color var(--duration-quick) var(--ease-snap),
      transform var(--duration-quick) var(--ease-snap);
    will-change: transform;
  }

  /* counter-skew the inner text so it reads straight */
  .link span {
    display: inline-block;
    transform: skew(12deg);
  }

  /* Slight per-item rotation for handcrafted comic feel */
  .menu li:nth-child(odd) .link {
    transform: skew(-12deg) rotate(-0.5deg);
  }
  .menu li:nth-child(even) .link {
    transform: skew(-12deg) rotate(0.5deg);
  }

  .menu li:nth-child(odd) .link:hover {
    transform: skew(-12deg) rotate(-0.5deg) translate(-2px, -2px);
  }
  .menu li:nth-child(even) .link:hover {
    transform: skew(-12deg) rotate(0.5deg) translate(-2px, -2px);
  }

  .link:focus-visible {
    outline: 3px solid var(--color-signature);
    outline-offset: 4px;
  }

  .link.router-link-active {
    background: var(--color-ink);
    color: var(--color-paper);
  }

  /* Backdrop: hidden on desktop, halftone-shaded sheet on mobile.
     Only the .is-animating class enables the transition — viewport
     crosses snap, toggles animate. */
  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background-color: color-mix(in srgb, var(--color-bg) 78%, transparent);
    background-image: radial-gradient(
      circle,
      color-mix(in srgb, var(--color-ink) 40%, transparent) 1.5px,
      transparent 2px
    );
    background-size: 10px 10px;
    z-index: 9;
    opacity: 0;
    pointer-events: none;
    cursor: pointer;
  }

  /* Mobile: hide the inline menu and show it as an absolute sheet on toggle */
  @media (max-width: 50rem) {
    .bar {
      z-index: 11;
    }

    .hamburger {
      display: inline-flex;
    }

    .menu {
      position: absolute;
      top: calc(100% + 0.75rem);
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: stretch;
      gap: 0.75rem;
      background: var(--color-paper);
      border: 3px solid var(--color-ink);
      padding: 1rem;
      z-index: 10;
      opacity: 0;
      transform: translateY(-8px);
      pointer-events: none;
      /* No transition by default. Viewport changes snap; only .is-animating animates. */
    }

    .menu.is-animating {
      transition:
        opacity 180ms ease-out,
        transform 180ms var(--ease-snap);
    }

    .menu.is-open {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .menu li {
      width: 100%;
    }

    .link,
    .menu li:nth-child(odd) .link,
    .menu li:nth-child(even) .link {
      display: block;
      width: 100%;
      text-align: center;
      padding: 0.75rem 1rem;
    }

    .backdrop {
      display: block;
    }

    .backdrop.is-animating {
      transition: opacity 180ms ease-out;
    }

    .backdrop.is-open {
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
