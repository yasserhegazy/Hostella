<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useTenantRegistration } from '../composables/useTenantRegistration'
import { getAllCountries } from '@/utils/countries'
import type { InitRegistrationRequest } from '../types'

const router = useRouter()
const { loading, error, validationErrors, initRegistration } = useTenantRegistration()

const form = ref<InitRegistrationRequest>({
  name: '',
  email: '',
  phone: '',
  location: {
    country_code: '',
    city: '',
    region_name: '',
    address_line: '',
    postal_code: '',
    timezone: ''
  }
})

const countries = computed(() =>
  getAllCountries('en').map(c => ({ value: c.code, label: c.name }))
)

function getFieldError(field: string): string | undefined {
  const errors = validationErrors.value[field]
  return errors?.length ? errors[0] : undefined
}

async function handleSubmit() {
  try {
    await initRegistration(form.value)
    router.push({ name: 'registration-pending' })
  } catch {
    // handled by composable
  }
}
</script>

<template>
  <AuthLayout :current-step="1" show-steps max-width="2xl">
    <template #header-action>
      <router-link to="/login" class="text-sm text-gray-500 hover:text-primary transition-colors">
        Already have an account?
        <span class="font-medium text-primary">Sign in</span>
      </router-link>
    </template>

    <div class="mb-6 text-center">
      <h1 class="text-2xl font-bold text-gray-900">Register Your Hotel</h1>
      <p class="mt-1 text-gray-500">Fill in your hotel details to get started</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Hotel Information -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center gap-2.5 mb-5">
          <div class="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 class="text-base font-semibold text-gray-900">Hotel Information</h2>
        </div>

        <div class="space-y-4">
          <BaseInput
            v-model="form.name"
            label="Hotel Name"
            placeholder="Grand Palace Hotel"
            required
            :error="getFieldError('name')"
          />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.email"
              type="email"
              label="Email Address"
              placeholder="contact@yourhotel.com"
              required
              :error="getFieldError('email')"
            />
            <BaseInput
              v-model="form.phone"
              type="tel"
              label="Phone Number"
              placeholder="+1 234 567 8900"
              required
              :error="getFieldError('phone')"
            />
          </div>
        </div>
      </div>

      <!-- Location Information -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div class="flex items-center gap-2.5 mb-5">
          <div class="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center">
            <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 class="text-base font-semibold text-gray-900">Location</h2>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseSelect
              v-model="form.location.country_code"
              label="Country"
              :options="countries"
              placeholder="Select country"
              required
              :error="getFieldError('location.country_code')"
            />
            <BaseInput
              v-model="form.location.city"
              label="City"
              placeholder="New York"
              required
              :error="getFieldError('location.city')"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput
              v-model="form.location.region_name"
              label="Region / State"
              placeholder="New York (optional)"
              :error="getFieldError('location.region_name')"
            />
            <BaseInput
              v-model="form.location.postal_code"
              label="Postal Code"
              placeholder="10001 (optional)"
              :error="getFieldError('location.postal_code')"
            />
          </div>

          <BaseInput
            v-model="form.location.address_line"
            label="Street Address"
            placeholder="123 Main Street (optional)"
            :error="getFieldError('location.address_line')"
          />
        </div>
      </div>

      <!-- Error -->
      <div v-if="error" class="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-3">
        <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-red-700">{{ error }}</p>
      </div>

      <!-- Submit -->
      <div class="flex items-center justify-between">
        <router-link to="/" class="text-sm text-gray-500 hover:text-primary transition-colors">
          ← Back to home
        </router-link>
        <BaseButton type="submit" size="lg" :loading="loading" :disabled="loading">
          Continue
          <svg v-if="!loading" class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </BaseButton>
      </div>
    </form>
  </AuthLayout>
</template>
