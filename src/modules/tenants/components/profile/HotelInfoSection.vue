<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'

interface Props {
  name: string
  email: string
  phone: string
  description: string
  errors?: Record<string, string[]>
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => ({})
})

const emit = defineEmits<{
  'update:name': [value: string]
  'update:email': [value: string]
  'update:phone': [value: string]
  'update:description': [value: string]
}>()

function getError(field: string): string | undefined {
  return props.errors[field]?.[0]
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <!-- Section Header -->
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
        :model-value="name"
        label="Hotel Name"
        placeholder="Grand Palace Hotel"
        required
        :error="getError('name')"
        @update:model-value="emit('update:name', $event)"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseInput
          :model-value="email"
          type="email"
          label="Email Address"
          placeholder="contact@yourhotel.com"
          required
          :error="getError('email')"
          @update:model-value="emit('update:email', $event)"
        />
        <BaseInput
          :model-value="phone"
          type="tel"
          label="Phone Number"
          placeholder="+1 234 567 8900"
          required
          :error="getError('phone')"
          @update:model-value="emit('update:phone', $event)"
        />
      </div>

      <BaseTextarea
        :model-value="description"
        label="Description"
        placeholder="Tell guests about your hotel..."
        :rows="4"
        :error="getError('description')"
        hint="Write a compelling description to attract guests"
        @update:model-value="emit('update:description', $event)"
      />
    </div>
  </div>
</template>
