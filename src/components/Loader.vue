<script setup lang="ts">
  import loader from '../assets/loader.avif'
</script>

<template>
  <div class="loader" aria-hidden="true">
    <div class="inner">
      <img :src="loader" alt="" />
    </div>
  </div>
</template>

<style scoped>
  .loader {
    position: absolute;
    inset: 0;
    z-index: 5;
    pointer-events: none;
  }

  .inner {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding-bottom: 15vh;
    pointer-events: none;
  }

  .loader img {
    width: clamp(72px, 14vw, 140px);
    height: auto;
    animation: loader-pulse 1.8s ease-in-out infinite;
  }

  @keyframes loader-pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.85;
    }
    50% {
      transform: scale(1.06);
      opacity: 1;
    }
  }
</style>
