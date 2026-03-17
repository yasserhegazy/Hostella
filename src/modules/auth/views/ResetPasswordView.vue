<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import ResetPasswordForm from '../components/ResetPasswordForm.vue'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const router = useRouter()
const { loading, error, validationErrors, resetPassword } = useAuth()
const resetSuccess = ref(false)

const token = route.params.token as string

async function handleSubmit(data: { email: string; password: string; password_confirmation: string }) {
  try {
    await resetPassword({ token, ...data })
    resetSuccess.value = true
    setTimeout(() => router.push({ name: 'login' }), 3000)
  } catch {
    // handled by composable
  }
}
</script>

<template>
  <AuthLayout max-width="md">
    <template #header-action>
      <router-link to="/login" class="text-sm text-gray-500 hover:text-primary transition-colors">
        Back to
        <span class="font-medium text-primary">Sign in</span>
      </router-link>
    </template>

    <div class="mb-6 text-center">
      <h1 class="text-2xl font-bold text-gray-900">Reset Password</h1>
      <p class="mt-1 text-gray-500">Enter your new password below</p>
    </div>

    <BaseCard>
      <div class="p-6">
        <template v-if="resetSuccess">
          <div class="text-center py-4">
            <div class="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="text-lg font-semibold text-gray-900 mb-2">Password Reset Successfully</h2>
            <p class="text-sm text-gray-500 mb-6">
              You'll be redirected to the login page shortly.
            </p>
            <router-link to="/login" class="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              Sign in now →
            </router-link>
          </div>
        </template>

        <template v-else>
          <div v-if="error && !Object.keys(validationErrors).length" class="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-3">
            <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>

          <ResetPasswordForm
            :loading="loading"
            :validation-errors="validationErrors"
            @submit="handleSubmit"
          />
        </template>
      </div>
    </BaseCard>
  </AuthLayout>
</template>
