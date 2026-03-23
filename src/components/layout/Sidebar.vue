<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { useAuthStore } from '@/stores/auth'
import { UserRole } from '@/types/roles'

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const route = useRoute()
const authStore = useAuthStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

const menuItems = computed(() => {
  const items = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'home',
      roles: [] as UserRole[], // All authenticated users
    },
    {
      name: 'Staff',
      path: '/staff',
      icon: 'users',
      roles: [UserRole.HOTEL_ADMIN, UserRole.MANAGER],
    },
    {
      name: 'Hotel Profile',
      path: '/hotel/profile',
      icon: 'building',
      roles: [] as UserRole[], // All authenticated users
    },
  ]

  // Filter menu items based on user roles
  return items.filter(item => {
    if (item.roles.length === 0) return true // Available to all
    return authStore.hasAnyRole(item.roles)
  })
})

function isActive(path: string): boolean {
  return route.path === path || route.path.startsWith(`${path}/`)
}

function closeSidebar() {
  isOpen.value = false
}

function getIcon(iconName: string) {
  const icons: Record<string, string> = {
    home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  }
  return icons[iconName] || ''
}
</script>

<template>
  <!-- Mobile sidebar (drawer) -->
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50 lg:hidden" @close="closeSidebar">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-900/80" aria-hidden="true" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="closeSidebar"
                  aria-label="Close sidebar"
                >
                  <svg
                    class="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </TransitionChild>

            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 pb-2">
              <div class="flex h-16 shrink-0 items-center">
                <span class="text-lg font-bold text-gray-900">Hostella</span>
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in menuItems" :key="item.path">
                        <router-link
                          :to="item.path"
                          :class="[
                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
                            isActive(item.path)
                              ? 'bg-primary-100 text-primary-700'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          ]"
                          @click="closeSidebar"
                        >
                          <svg
                            class="h-6 w-6 shrink-0"
                            :class="[
                              isActive(item.path) ? 'text-primary-700' : 'text-gray-400 group-hover:text-gray-600'
                            ]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" :d="getIcon(item.icon)" />
                          </svg>
                          {{ item.name }}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Desktop sidebar -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gray-50 px-6">
      <div class="flex h-16 shrink-0 items-center">
        <span class="text-lg font-bold text-gray-900">Hostella</span>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in menuItems" :key="item.path">
                <router-link
                  :to="item.path"
                  :class="[
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors',
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  ]"
                >
                  <svg
                    class="h-6 w-6 shrink-0"
                    :class="[
                      isActive(item.path) ? 'text-primary-700' : 'text-gray-400 group-hover:text-gray-600'
                    ]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" :d="getIcon(item.icon)" />
                  </svg>
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
