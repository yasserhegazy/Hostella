<script setup lang="ts">
import { useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import LoginForm from '../components/LoginForm.vue'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { loading, error, validationErrors, login } = useAuth()

async function handleSubmit(credentials: { email: string; password: string }) {
  try {
    await login(credentials)
    router.push({ name: 'hotel-profile' })
  } catch {
    // handled by composable
  }
}
</script>

<template>
  <AuthLayout max-width="md">
    <template #header-action>
      <router-link to="/register" class="text-sm text-gray-500 hover:text-primary transition-colors">
        Don't have an account?
        <span class="font-medium text-primary">Register</span>
      </router-link>
    </template>

    <div class="mb-6 text-center">
      <h1 class="text-2xl font-bold text-gray-900">Welcome Back</h1>
      <p class="mt-1 text-gray-500">Sign in to manage your hotel</p>
    </div>

    <BaseCard>
      <div class="p-6">
        <div v-if="error && !Object.keys(validationErrors).length" class="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-3">
          <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>

        <LoginForm
          :loading="loading"
          :validation-errors="validationErrors"
          @submit="handleSubmit"
        />
      </div>
    </BaseCard>
  </AuthLayout>
</template>
