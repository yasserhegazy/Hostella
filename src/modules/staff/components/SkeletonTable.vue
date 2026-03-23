<template>
  <div class="animate-pulse">
    <div v-for="i in rows" :key="i" class="border-b border-gray-200 py-4">
      <div class="flex items-center space-x-4">
        <div class="h-4 bg-gray-200 rounded w-1/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/5"></div>
        <div class="h-4 bg-gray-200 rounded w-1/6"></div>
        <div class="h-4 bg-gray-200 rounded w-1/6"></div>
        <div class="h-4 bg-gray-200 rounded w-1/6"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    rows?: number
  }>(),
  {
    rows: 5
  }
)
</script>
