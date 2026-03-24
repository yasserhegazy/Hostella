<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { Notyf } from 'notyf'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useStaffAuth } from '../composables/useStaffAuth'
import { useAuthStore } from '@/stores/auth'
import { UserRole } from '@/types/roles'

const route = useRoute()
const router = useRouter()
const notyf = new Notyf({ position: { x: 'right', y: 'top' }, duration: 4000 })
const { loading, login } = useStaffAuth()
const authStore = useAuthStore()

// Read tenant from URL query param and persist for X-Tenant header
const tenantFromUrl = (route.query.tenant as string) || ''
if (tenantFromUrl) {
  localStorage.setItem('tenant_id', tenantFromUrl)
}

const hasTenant = !!(tenantFromUrl || localStorage.getItem('tenant_id'))

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required')
})

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: ''
  }
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit(async (values) => {
  try {
    const data = await login({
      email: values.email,
      password: values.password
    })

    notyf.success(data.message || 'Logged in successfully.')

    const roles = authStore.roles
    if (roles.includes(UserRole.HOTEL_ADMIN) || roles.includes(UserRole.MANAGER)) {
      router.push({ name: 'staff-list' })
    } else {
      router.push({ name: 'staff-dashboard' })
    }
  } catch (err: any) {
    if (err?.status === 401 || err?.response?.status === 401) {
      notyf.error('Invalid credentials or inactive account.')
    } else {
      notyf.error('Login failed. Please try again.')
    }
  }
})
</script>

<template>
  <AuthLayout>
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Staff Login</h2>
        <p class="text-sm text-gray-600 mt-2">
          Sign in to access your hotel's management portal
        </p>
      </div>

      <form @submit="onSubmit" class="space-y-6">
        <!-- Email -->
        <BaseInput
          v-model="email"
          label="Email Address"
          type="email"
          required
          :error="errors.email"
          placeholder="you@hotel.com"
        />

        <!-- Password -->
        <BaseInput
          v-model="password"
          label="Password"
          type="password"
          required
          :error="errors.password"
          placeholder="••••••••"
        />

        <BaseButton type="submit" :loading="loading" class="w-full">
          Sign In
        </BaseButton>
      </form>

      <!-- No tenant warning -->
      <div v-if="!hasTenant" class="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-700">
        <p class="font-medium">No hotel linked</p>
        <p class="mt-1">Use the login link from your setup email, or contact your hotel admin for access.</p>
      </div>

      <p class="text-center text-sm text-gray-600 mt-6">
        Hotel owner?
        <router-link to="/login" class="text-emerald-600 hover:text-emerald-700 font-medium">
          Sign in here
        </router-link>
      </p>
    </div>
  </AuthLayout>
</template>
