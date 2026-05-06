<script setup lang="ts">
const links = [
  { to: '/projects', label: 'Projects' },
  { to: '/demos', label: 'Demos' },
  { to: '/notes', label: 'Notes' },
  { to: '/about', label: 'About' },
  { to: '/uses', label: 'Uses' },
]
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="peek peek-hover">Jason Rice</RouterLink>
      <ul>
        <li v-for="link in links" :key="link.to">
          <RouterLink :to="link.to" class="peek peek-hover">{{ link.label }}</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
