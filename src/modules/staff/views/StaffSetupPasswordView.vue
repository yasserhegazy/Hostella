<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useStaffManagement } from '../composables/useStaffManagement'
import { apiClient } from '@/services/api/client'

const route = useRoute()
const router = useRouter()
const notyf = new Notyf({ position: { x: 'right', y: 'top' }, duration: 4000 })

const { loading, setupPassword } = useStaffManagement()

const token = (route.query.token as string) || ''
const email = (route.query.email as string) || ''
const tenant = (route.query.tenant as string) || ''

if (tenant) {
  localStorage.setItem('tenant_id', tenant)
}

const isValidLink = token !== '' && email !== ''
const tokenStatus = ref<'checking' | 'valid' | 'already_activated' | 'invalid'>('checking')

const schema = yup.object({
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  password_confirmation: yup.string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    password: '',
    password_confirmation: ''
  }
})

const [password] = defineField('password')
const [passwordConfirmation] = defineField('password_confirmation')

onMounted(async () => {
  if (!isValidLink) return

  await apiClient.getCsrfCookie()

  try {
    const result = await apiClient.get<{ status: string }>(
      `/v1/staff/validate-setup-token?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
    )
    tokenStatus.value = result.status as typeof tokenStatus.value
  } catch {
    tokenStatus.value = 'invalid'
  }
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = await setupPassword({
      email,
      token,
      password: values.password,
      password_confirmation: values.password_confirmation
    })

    notyf.success(result.message || 'Password set successfully. You can now log in.')
    router.push({ name: 'staff-login' })
  } catch (error: any) {
    if (error.error === 'Invalid or expired setup token.') {
      tokenStatus.value = 'invalid'
      notyf.error('Invalid or expired setup link. Please request a new one.')
    } else if (error.validationErrors) {
      notyf.error('Please fix the validation errors below.')
    } else {
      notyf.error('Failed to setup password. Please try again.')
    }
  }
})
</script>

<template>
  <AuthLayout>
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Setup Your Password</h2>
        <p class="text-sm text-gray-600 mt-2">
          Create a password to activate your account
        </p>
      </div>

      <!-- Invalid link (missing params) -->
      <div v-if="!isValidLink" class="bg-red-50 border border-red-200 rounded-lg p-5 text-center">
        <p class="text-red-700 font-medium">Invalid or missing setup link.</p>
        <p class="text-red-600 text-sm mt-1">Please check your email for the correct link.</p>
      </div>

      <!-- Checking token status -->
      <div v-else-if="tokenStatus === 'checking'" class="flex flex-col items-center gap-3 py-12">
        <svg class="animate-spin h-8 w-8 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p class="text-gray-500 text-sm">Validating your setup link…</p>
      </div>

      <!-- Account already activated -->
      <div v-else-if="tokenStatus === 'already_activated'" class="text-center">
        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-6">
          <svg class="mx-auto h-12 w-12 text-emerald-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-emerald-800 font-semibold text-lg">Account Already Activated</p>
          <p class="text-emerald-700 text-sm mt-2">
            The account for <strong>{{ email }}</strong> has already been set up.
          </p>
        </div>
        <BaseButton @click="router.push({ name: 'staff-login' })" class="w-full">
          Go to Staff Login
        </BaseButton>
      </div>

      <!-- Token invalid or expired -->
      <div v-else-if="tokenStatus === 'invalid'" class="bg-red-50 border border-red-200 rounded-lg p-5 text-center">
        <p class="text-red-700 font-medium">Invalid or expired setup link.</p>
        <p class="text-red-600 text-sm mt-1">Please contact your manager to resend the setup email.</p>
      </div>

      <!-- Valid token: show form -->
      <template v-else>
        <div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
          <p class="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-1">Setting up account for</p>
          <p class="text-base font-semibold text-gray-900">{{ email }}</p>
        </div>

        <form @submit="onSubmit" class="space-y-6">
          <BaseInput
            v-model="password"
            label="Password"
            type="password"
            required
            :error="errors.password"
            placeholder="Enter password (min 8 characters)"
          />

          <BaseInput
            v-model="passwordConfirmation"
            label="Confirm Password"
            type="password"
            required
            :error="errors.password_confirmation"
            placeholder="Confirm your password"
          />

          <BaseButton type="submit" :loading="loading" class="w-full">
            Activate Account
          </BaseButton>
        </form>

        <p class="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <router-link to="/login" class="text-emerald-600 hover:text-emerald-700 font-medium">
            Sign in
          </router-link>
        </p>
      </template>
    </div>
  </AuthLayout>
</template>
