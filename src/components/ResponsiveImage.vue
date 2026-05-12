<script setup lang="ts">
  withDefaults(
    defineProps<{
      picture: ImagetoolsPicture
      alt: string
      sizes?: string
      eager?: boolean
    }>(),
    {
      sizes: '100vw',
      eager: false,
    },
  )

  const emit = defineEmits<{
    load: [Event]
  }>()
</script>

<template>
  <picture>
    <source
      v-for="(srcset, format) in picture.sources"
      :key="format"
      :type="`image/${format}`"
      :srcset="srcset"
      :sizes="sizes"
    />
    <img
      :src="picture.img.src"
      :width="picture.img.w"
      :height="picture.img.h"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :decoding="eager ? 'sync' : 'async'"
      :fetchpriority="eager ? 'high' : 'auto'"
      @load="emit('load', $event)"
    />
  </picture>
</template>
