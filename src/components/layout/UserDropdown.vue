<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useAuthStore } from '@/stores/auth'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const authStore = useAuthStore()
const notifications = useNotifications()

const user = computed(() => authStore.user)

const userInitials = computed(() => {
  if (!user.value) return '?'
  const first = user.value.first_name?.[0] || ''
  const last = user.value.last_name?.[0] || ''
  return (first + last).toUpperCase()
})

const fullName = computed(() => {
  if (!user.value) return 'Guest'
  return `${user.value.first_name} ${user.value.last_name}`.trim()
})

async function handleLogout() {
  try {
    await authStore.logout()
    notifications.success('Logged out successfully')
    await router.push({ name: 'login' })
  } catch (error) {
    notifications.error('Failed to logout')
  }
}
</script>

<template>
  <Menu as="div" class="relative">
    <MenuButton
      class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="User menu"
    >
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-semibold text-sm"
        :title="fullName"
      >
        {{ userInitials }}
      </div>
      <span class="hidden sm:inline">{{ fullName }}</span>
      <svg
        class="h-4 w-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
      >
        <div class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm font-medium text-gray-900">{{ fullName }}</p>
          <p class="text-sm text-gray-500 truncate">{{ user?.email }}</p>
        </div>
        
        <div class="py-1">
          <MenuItem v-slot="{ active }">
            <router-link
              to="/profile"
              :class="[
                'flex w-full items-center gap-3 px-4 py-2 text-sm',
                active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
              ]"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Profile
            </router-link>
          </MenuItem>
          
          <MenuItem v-slot="{ active }">
            <button
              type="button"
              :class="[
                'flex w-full items-center gap-3 px-4 py-2 text-sm',
                active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
              ]"
              @click="handleLogout"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
