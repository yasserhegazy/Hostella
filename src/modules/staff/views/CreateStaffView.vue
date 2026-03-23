<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import AppLayout from '@/components/layout/AppLayout.vue'
import StaffForm from '../components/StaffForm.vue'
import { useStaffManagement } from '../composables/useStaffManagement'
import type { CreateStaffRequest, UpdateStaffRequest } from '../types'

const router = useRouter()
const notyf = new Notyf({ position: { x: 'right', y: 'top' }, duration: 4000 })

const { loading, validationErrors, createStaff } = useStaffManagement()

const handleSubmit = async (data: CreateStaffRequest | UpdateStaffRequest) => {
  try {
    const result = await createStaff(data as CreateStaffRequest)
    notyf.success(result.message || 'Staff member created successfully')
    router.push({ name: 'staff-list' })
  } catch (error) {
    // Validation errors are handled by the form
    if (!validationErrors.value || Object.keys(validationErrors.value).length === 0) {
      notyf.error('Failed to create staff member')
    }
  }
}

const handleCancel = () => {
  router.push({ name: 'staff-list' })
}
</script>

<template>
  <AppLayout>
    <div class="max-w-2xl">
      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Create Staff Member</h1>
        <p class="text-sm text-gray-500 mt-1">Add a new staff member to your hotel</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <StaffForm
          :loading="loading"
          :validation-errors="validationErrors"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </AppLayout>
</template>
