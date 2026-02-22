<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { useTenantRegistration } from '../composables/useTenantRegistration'

const route = useRoute()
const router = useRouter()
const { error, verifyEmail } = useTenantRegistration()

const verifying = ref(true)

onMounted(async () => {
  const token = route.params.token as string

  if (!token) {
    error.value = 'Invalid verification link'
    verifying.value = false
    return
  }

  try {
    await verifyEmail(token)
    verifying.value = false

    setTimeout(() => {
      router.push({ name: 'set-password', params: { token } })
    }, 2000)
  } catch {
    verifying.value = false
  }
})
</script>

<template>
  <AuthLayout :current-step="2" show-steps>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">

      <!-- Loading State -->
      <div v-if="verifying">
        <div class="mx-auto w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mb-6">
          <svg class="w-10 h-10 text-primary animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
        <h1 class="text-xl font-bold text-gray-900 mb-2">Verifying your email…</h1>
        <p class="text-gray-500">Please wait a moment.</p>
      </div>

      <!-- Success State -->
      <div v-else-if="!error">
        <div class="mx-auto w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mb-6">
          <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
        <p class="text-gray-500 mb-6">Redirecting you to set your password…</p>
        <div class="inline-flex items-center gap-1.5 text-sm text-primary">
          <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 0ms" />
          <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 150ms" />
          <span class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 300ms" />
        </div>
      </div>

      <!-- Error State -->
      <div v-else>
        <div class="mx-auto w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h1>
        <p class="text-red-600 mb-6">{{ error }}</p>
        <router-link
          to="/register"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Start registration again
        </router-link>
      </div>

    </div>
  </AuthLayout>
</template>
