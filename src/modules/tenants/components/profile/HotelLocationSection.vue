<script setup lang="ts">
import { computed } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import { getAllCountries } from '@/utils/countries'
import type { Location } from '../../types'

interface Props {
  location: Location
  errors?: Record<string, string[]>
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => ({})
})

const emit = defineEmits<{
  'update:location': [value: Location]
}>()

const countries = computed(() =>
  getAllCountries('en').map(c => ({ value: c.code, label: c.name }))
)

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
          :model-value="location.country_code"
          label="Country"
          :options="countries"
          placeholder="Select country"
          required
          :error="getError('location.country_code')"
          @update:model-value="emit('update:location', { ...location, country_code: String($event) })"
        />
        <BaseInput
          :model-value="location.city"
          label="City"
          placeholder="New York"
          required
          :error="getError('location.city')"
          @update:model-value="emit('update:location', { ...location, city: $event })"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <BaseInput
          :model-value="location.region_name"
          label="Region / State"
          placeholder="New York (optional)"
          :error="getError('location.region_name')"
          @update:model-value="emit('update:location', { ...location, region_name: $event })"
        />
        <BaseInput
          :model-value="location.postal_code"
          label="Postal Code"
          placeholder="10001 (optional)"
          :error="getError('location.postal_code')"
          @update:model-value="emit('update:location', { ...location, postal_code: $event })"
        />
      </div>

      <BaseInput
        :model-value="location.address_line"
        label="Street Address"
        placeholder="123 Main Street (optional)"
        :error="getError('location.address_line')"
        @update:model-value="emit('update:location', { ...location, address_line: $event })"
      />
    </div>
  </div>
</template>
