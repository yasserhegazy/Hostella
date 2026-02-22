<script setup lang="ts">
interface Props {
  title?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  shadow?: boolean
}

withDefaults(defineProps<Props>(), {
  padding: 'md',
  shadow: true
})
</script>

<template>
  <div
    class="bg-white rounded-lg"
    :class="[
      shadow ? 'shadow-md' : 'border border-gray-200',
      padding === 'none' ? '' : padding === 'sm' ? 'p-4' : padding === 'lg' ? 'p-8' : 'p-6'
    ]"
  >
    <div v-if="title" class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
    </div>
    
    <slot />
  </div>
</template>
