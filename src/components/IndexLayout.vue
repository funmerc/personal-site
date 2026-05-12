<script setup lang="ts">
  import ComicPanel from './ComicPanel.vue'
  import Loader from './Loader.vue'

  withDefaults(
    defineProps<{
      title: string
      rotateTitle?: number
      loading?: boolean
    }>(),
    {
      rotateTitle: -0.6,
      loading: false,
    },
  )
</script>

<template>
  <section class="page">
    <div class="fade-content" :class="{ 'is-loading': loading }">
      <ComicPanel class="title-panel" :rotate="rotateTitle" size="md">
        <h1>{{ title }}</h1>
      </ComicPanel>
      <div class="body">
        <slot />
      </div>
    </div>
    <Transition name="loader-fade">
      <Loader v-if="loading" />
    </Transition>
  </section>
</template>

<style scoped>
  .title-panel {
    max-width: max-content;
    margin: 0 0 1.75rem;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .loader-fade-leave-active {
    transition: opacity 250ms ease-out;
  }

  .loader-fade-leave-to {
    opacity: 0;
  }
</style>
