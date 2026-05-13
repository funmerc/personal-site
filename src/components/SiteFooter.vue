<script setup lang="ts">
  import { useTheme } from '../composables/useTheme'

  const year = new Date().getFullYear()
  const { effective, toggle } = useTheme()
</script>

<template>
  <footer>
    <div class="panel panel-left">
      <p class="copy">&copy; {{ year }} Jason Rice</p>
    </div>
    <div class="panel panel-right">
      <button
        type="button"
        class="toggle"
        :aria-label="
          effective === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
        "
        :title="effective === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
      >
        <span class="icon">
          <svg
            v-if="effective === 'dark'"
            id="theme-flashlight-icon"
            width="26"
            height="18"
            viewBox="0 0 26 18"
            fill="currentColor"
            aria-hidden="true"
          >
            <line
              x1="0.5"
              y1="9"
              x2="3.5"
              y2="9"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="1.2"
              y1="4"
              x2="3.8"
              y2="5.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="1.2"
              y1="14"
              x2="3.8"
              y2="12.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path d="M5.5 4 L11 1 L11 17 L5.5 14 Z" />
            <rect x="11" y="3" width="11" height="12" />
            <rect x="22" y="5" width="2" height="8" />
          </svg>
          <svg
            v-else
            id="theme-sunglasses-icon"
            width="26"
            height="14"
            viewBox="0 0 26 14"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="0.5" y="2" width="10" height="10" rx="1.5" />
            <rect x="15.5" y="2" width="10" height="10" rx="1.5" />
            <rect x="10.5" y="6" width="5" height="2" />
          </svg>
        </span>
      </button>
      <a href="https://github.com/funmerc" rel="noopener" target="_blank" class="link">
        <span>GitHub</span>
      </a>
      <a
        href="https://www.linkedin.com/in/jason-a-rice"
        rel="noopener"
        target="_blank"
        class="link"
      >
        <span>LinkedIn</span>
      </a>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem 1.5rem;
  }

  .panel {
    padding: 0.55rem 0.9rem;
    background: var(--color-paper);
    border: 3px solid var(--color-ink);
    box-shadow: 4px 4px 0 var(--color-ink);
    color: var(--color-muted);
    font-size: 0.875rem;
  }

  .panel-left {
    transform: rotate(-1.5deg);
  }

  .panel-right {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    transform: rotate(1.5deg);
  }

  @media (max-width: 600px) {
    footer {
      flex-direction: column;
      gap: 0.6rem;
    }
  }

  .copy {
    margin: 0;
  }

  .toggle,
  .link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--color-paper);
    color: var(--color-ink);
    border: 3px solid var(--color-ink);
    padding: 0.3rem 0.85rem;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transform: skew(-12deg) rotate(-0.5deg);
    transition: transform var(--duration-quick) var(--ease-snap);
    font-family: inherit;
    will-change: transform;
  }

  .toggle {
    padding: 0.3rem 0.6rem;
  }

  .toggle .icon,
  .link span {
    display: inline-flex;
    align-items: center;
    transform: skew(12deg);
  }

  .toggle:hover,
  .link:hover {
    transform: skew(-12deg) rotate(-0.5deg) translate(-2px, -2px);
  }

  .toggle:focus-visible,
  .link:focus-visible {
    outline: 3px solid var(--color-signature);
    outline-offset: 4px;
  }
</style>
