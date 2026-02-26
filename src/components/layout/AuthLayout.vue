<script setup lang="ts">
import RegistrationStepper from '@/components/registration/RegistrationStepper.vue'

interface Props {
  currentStep?: 1 | 2 | 3
  showSteps?: boolean
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

withDefaults(defineProps<Props>(), {
  showSteps: false,
  maxWidth: 'lg'
})

const maxWidthClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 flex flex-col">
    <!-- Header -->
    <header class="py-6 px-4 flex-shrink-0">
      <div class="max-w-2xl mx-auto flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-2.5 group">
          <div class="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span class="text-xl font-bold text-gray-900">Host<span class="text-primary">ella</span></span>
        </router-link>
        <slot name="header-action" />
      </div>
    </header>

    <!-- Step Indicator -->
    <div v-if="showSteps" class="px-4 mb-2">
      <div class="max-w-2xl mx-auto">
        <RegistrationStepper :current-step="currentStep ?? 1" />
      </div>
    </div>

    <!-- Main Content -->
    <main class="flex-1 flex items-start justify-center px-4 py-6 pb-12">
      <div class="w-full" :class="maxWidthClasses[maxWidth]">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <footer class="py-4 flex-shrink-0">
      <p class="text-center text-xs text-gray-400">
        © {{ new Date().getFullYear() }} Hostella. All rights reserved.
      </p>
    </footer>
  </div>
</template>
