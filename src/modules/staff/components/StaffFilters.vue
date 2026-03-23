<script setup lang="ts">
import { computed } from 'vue'
import { UserRole } from '@/types/roles'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'

const props = defineProps<{
  search: string
  role?: string
  isActive?: boolean
}>()

const emit = defineEmits<{
  'update:search': [value: string]
  'update:role': [value: string | undefined]
  'update:isActive': [value: boolean | undefined]
  reset: []
}>()

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: UserRole.HOTEL_ADMIN, label: 'Hotel Admin' },
  { value: UserRole.MANAGER, label: 'Manager' },
  { value: UserRole.RECEPTIONIST, label: 'Receptionist' },
  { value: UserRole.HOUSEKEEPER, label: 'Housekeeper' }
]

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: '1', label: 'Active' },
  { value: '0', label: 'Inactive' }
]

const handleSearchInput = (value: string) => {
  emit('update:search', value)
}

const handleRoleChange = (value: string | number) => {
  const strValue = String(value)
  emit('update:role', strValue || undefined)
}

const handleStatusChange = (value: string | number) => {
  const strValue = String(value)
  if (strValue === '1') {
    emit('update:isActive', true)
  } else if (strValue === '0') {
    emit('update:isActive', false)
  } else {
    emit('update:isActive', undefined)
  }
}

const statusValue = computed(() => {
  if (props.isActive === true) return '1'
  if (props.isActive === false) return '0'
  return ''
})
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Search Input -->
      <div class="md:col-span-2">
        <BaseInput
          :model-value="search"
          @update:model-value="handleSearchInput"
          type="text"
          placeholder="Search by name, email, or phone..."
          label="Search"
        >
          <template #prefix>
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </template>
        </BaseInput>
      </div>

      <!-- Role Filter -->
      <div>
        <BaseSelect
          :model-value="role || ''"
          @update:model-value="handleRoleChange"
          :options="roleOptions"
          label="Role"
        />
      </div>

      <!-- Status Filter -->
      <div>
        <BaseSelect
          :model-value="statusValue"
          @update:model-value="handleStatusChange"
          :options="statusOptions"
          label="Status"
        />
      </div>
    </div>

    <!-- Reset Button -->
    <div class="mt-4 flex justify-end">
      <button
        type="button"
        @click="emit('reset')"
        class="text-sm text-gray-600 hover:text-gray-900 font-medium"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>
