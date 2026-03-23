<script setup lang="ts">
import UserDropdown from './UserDropdown.vue'

interface Emits {
  (e: 'toggle-sidebar'): void
}

defineEmits<Emits>()
</script>

<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Left side: Hamburger (mobile) + Hotel name/logo -->
        <div class="flex items-center gap-3">
          <!-- Hamburger button (mobile only) -->
          <button
            @click="$emit('toggle-sidebar')"
            class="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle sidebar"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Hotel name/logo -->
          <router-link
            to="/dashboard"
            class="flex items-center gap-3 text-xl font-bold text-gray-900 hover:text-primary transition-colors"
          >
            <svg
              class="h-8 w-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <span>Hostella Hotel</span>
          </router-link>
        </div>

        <!-- Right side: User dropdown -->
        <div class="flex items-center">
          <UserDropdown />
        </div>
      </div>
    </div>
  </nav>
</template>
