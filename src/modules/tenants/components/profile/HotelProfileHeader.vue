<script setup lang="ts">
interface Props {
  hotelName: string
  profileImageUrl: string | null
}

defineProps<Props>()

const emit = defineEmits<{
  changeBanner: []
}>()
</script>

<template>
  <div class="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg group">
    <!-- Banner Image -->
    <img
      v-if="profileImageUrl"
      :src="profileImageUrl"
      alt="Hotel banner"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    >
    <div v-else class="w-full h-full bg-gradient-to-br from-primary to-primary-dark" />

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

    <!-- Hotel Name -->
    <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
        {{ hotelName }}
      </h1>
      <p class="mt-1 text-sm text-white/70">Hotel Profile</p>
    </div>

    <!-- Change Banner Button -->
    <button
      type="button"
      class="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium text-gray-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
      @click="emit('changeBanner')"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      Change Banner
    </button>
  </div>
</template>
