<script setup lang="ts">
  import SiteNav from './components/SiteNav.vue'
  import SiteFooter from './components/SiteFooter.vue'
  import { useNavDirection } from './composables/useNavDirection'

  const slideDirection = useNavDirection()
</script>

<template>
  <div class="layout" :style="{ '--slide-direction': slideDirection }">
    <SiteNav />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="page-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 80rem;
    width: 100%;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
</style>
