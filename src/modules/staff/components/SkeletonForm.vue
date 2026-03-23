<template>
  <div class="animate-pulse space-y-6">
    <div v-for="i in fields" :key="i" class="space-y-2">
      <div class="h-4 bg-gray-200 rounded w-1/4"></div>
      <div class="h-10 bg-gray-200 rounded w-full"></div>
    </div>
    <div class="flex gap-3 pt-4">
      <div class="h-10 bg-gray-200 rounded w-24"></div>
      <div class="h-10 bg-gray-200 rounded w-24"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    fields?: number
  }>(),
  {
    fields: 5
  }
)
</script>
