<script setup lang="ts">
  import { computed } from 'vue'

  type Tone = 'paper' | 'ink'
  type Size = 'sm' | 'md' | 'lg'

  const props = withDefaults(
    defineProps<{
      tone?: Tone
      size?: Size
      rotate?: number
      border?: boolean
    }>(),
    {
      tone: 'paper',
      size: 'md',
      rotate: 0,
      border: true,
    },
  )

  const style = computed(() => ({
    '--panel-rotate': `${props.rotate}deg`,
  }))
</script>

<template>
  <div
    class="comic-panel"
    :class="[
      `is-tone-${tone}`,
      `is-size-${size}`,
      { 'is-bordered': border },
    ]"
    :style="style"
  >
    <slot />
  </div>
</template>

<style scoped>
  .comic-panel {
    position: relative;
    display: flex;
    flex-direction: column;
    transform: rotate(var(--panel-rotate, 0deg));
    transition: transform var(--duration-quick) var(--ease-snap);
  }

  .is-tone-paper {
    background: var(--color-paper);
    color: var(--color-ink);
  }

  .is-tone-ink {
    background: var(--color-ink);
    color: var(--color-paper);
  }

  .is-bordered {
    border: 3px solid var(--color-ink);
  }

  .is-bordered.is-tone-paper {
    box-shadow: 6px 6px 0 var(--color-ink);
  }

  .is-bordered.is-tone-ink {
    box-shadow: 6px 6px 0 var(--color-signature);
  }

  .is-size-sm {
    padding: 1rem;
  }

  .is-size-md {
    padding: 1.5rem;
  }

  .is-size-lg {
    padding: 2.25rem;
  }
</style>
