<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Notyf } from 'notyf'
import AppLayout from '@/components/layout/AppLayout.vue'
import StaffForm from '../components/StaffForm.vue'
import SkeletonForm from '../components/SkeletonForm.vue'
import { useStaffManagement } from '../composables/useStaffManagement'
import type { UpdateStaffRequest } from '../types'

const router = useRouter()
const route = useRoute()
const notyf = new Notyf({ position: { x: 'right', y: 'top' }, duration: 4000 })

const { staffMember, loading, validationErrors, fetchStaffMember, updateStaff } = useStaffManagement()

const loadingStaff = ref(true)

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id || isNaN(id)) {
    notyf.error('Invalid staff member ID')
    router.push({ name: 'staff-list' })
    return
  }

  try {
    await fetchStaffMember(id)
  } catch (error) {
    notyf.error('Failed to load staff member')
    router.push({ name: 'staff-list' })
  } finally {
    loadingStaff.value = false
  }
})

const handleSubmit = async (data: UpdateStaffRequest) => {
  const id = Number(route.params.id)
  
  try {
    const result = await updateStaff(id, data)
    notyf.success(result.message || 'Staff member updated successfully')
    router.push({ name: 'staff-list' })
  } catch (error) {
    // Validation errors are handled by the form
    if (!validationErrors.value || Object.keys(validationErrors.value).length === 0) {
      notyf.error('Failed to update staff member')
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
        <h1 class="text-2xl font-bold text-gray-900">Edit Staff Member</h1>
        <p class="text-sm text-gray-500 mt-1">Update staff member information</p>
      </div>

      <!-- Loading State -->
      <div v-if="loadingStaff" class="bg-white border border-gray-200 rounded-lg p-6">
        <SkeletonForm />
      </div>

      <!-- Form Card -->
      <div v-else-if="staffMember" class="bg-white border border-gray-200 rounded-lg p-6">
        <StaffForm
          :staff="staffMember"
          :loading="loading"
          :validation-errors="validationErrors"
          @submit="handleSubmit"
          @cancel="handleCancel"
        />
      </div>

      <!-- Error State -->
      <div v-else class="bg-white border border-gray-200 rounded-lg p-6">
        <p class="text-center text-gray-500">Staff member not found</p>
      </div>
    </div>
  </AppLayout>
</template>
