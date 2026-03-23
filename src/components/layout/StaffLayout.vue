<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'login' })
}

const userInitials = computed(() => {
  if (!authStore.user) return '?'
  const first = authStore.user.first_name?.[0] || ''
  const last = authStore.user.last_name?.[0] || ''
  return (first + last).toUpperCase()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Simple Top Bar -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Left: App Name/Logo -->
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Hostella</h1>
          </div>
          
          <!-- Right: User Info + Logout -->
          <div class="flex items-center space-x-4">
            <!-- User Avatar + Name -->
            <div class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
                {{ userInitials }}
              </div>
              <span class="hidden sm:block text-sm font-medium text-gray-700">
                {{ authStore.user?.first_name }} {{ authStore.user?.last_name }}
              </span>
            </div>
            
            <!-- Logout Button -->
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
    
    <!-- Main Content (no sidebar) -->
    <main>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <slot />
      </div>
    </main>
  </div>
</template>
