<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useTenantRegistration } from '../composables/useTenantRegistration'
import type { SetPasswordRequest } from '../types'

const route = useRoute()
const router = useRouter()
const { loading, error, validationErrors, setPassword } = useTenantRegistration()

const form = ref<SetPasswordRequest>({
  token: route.params.token as string,
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: ''
})

function getFieldError(field: string): string | undefined {
  const errors = validationErrors.value[field]
  return errors?.length ? errors[0] : undefined
}

const passwordStrength = computed(() => {
  const pwd = form.value.password
  if (!pwd) return 0
  let score = 0
  if (pwd.length >= 8) score++
  if (/[A-Z]/.test(pwd)) score++
  if (/[0-9]/.test(pwd)) score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++
  return score
})

const strengthLabel = computed(() => {
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  return labels[passwordStrength.value]
})

const strengthColor = computed(() => {
  const colors = ['', 'bg-red-400', 'bg-amber-400', 'bg-yellow-400', 'bg-primary']
  return colors[passwordStrength.value]
})

const strengthTextColor = computed(() => {
  const colors = ['', 'text-red-500', 'text-amber-500', 'text-yellow-600', 'text-primary']
  return colors[passwordStrength.value]
})

async function handleSubmit() {
  try {
    await setPassword(form.value)
    router.push({ name: 'registration-complete' })
  } catch {
    // handled by composable
  }
}
</script>

<template>
  <AuthLayout :current-step="3" show-steps>
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-bold text-gray-900">Create Your Account</h1>
      <p class="mt-1 text-gray-500">One last step — set up your owner account</p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <!-- Name fields -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BaseInput
            v-model="form.first_name"
            label="First Name"
            placeholder="John"
            required
            :error="getFieldError('first_name')"
          />
          <BaseInput
            v-model="form.last_name"
            label="Last Name"
            placeholder="Smith"
            required
            :error="getFieldError('last_name')"
          />
        </div>

        <!-- Password -->
        <div>
          <BaseInput
            v-model="form.password"
            type="password"
            label="Password"
            placeholder="Create a strong password"
            required
            :error="getFieldError('password')"
          />
          <!-- Password strength meter -->
          <div v-if="form.password" class="mt-2">
            <div class="flex gap-1 mb-1">
              <div
                v-for="i in 4"
                :key="i"
                class="h-1.5 flex-1 rounded-full transition-all duration-300"
                :class="i <= passwordStrength ? strengthColor : 'bg-gray-200'"
              />
            </div>
            <p class="text-xs" :class="strengthTextColor">{{ strengthLabel }}</p>
          </div>
        </div>

        <BaseInput
          v-model="form.password_confirmation"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          required
          :error="getFieldError('password_confirmation')"
        />

        <!-- Error -->
        <div v-if="error" class="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-3">
          <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-red-700">{{ error }}</p>
        </div>

        <!-- Submit -->
        <BaseButton type="submit" size="lg" full-width :loading="loading" :disabled="loading">
          Complete Registration
        </BaseButton>

        <p class="text-xs text-center text-gray-400">
          By completing registration, you agree to our
          <a href="#" class="text-primary hover:underline">Terms of Service</a>
          and
          <a href="#" class="text-primary hover:underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  </AuthLayout>
</template>
