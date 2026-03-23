<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import AppLayout from '@/components/layout/AppLayout.vue'
import StaffTable from '../components/StaffTable.vue'
import StaffFilters from '../components/StaffFilters.vue'
import StaffEmptyState from '../components/StaffEmptyState.vue'
import SkeletonTable from '../components/SkeletonTable.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import { useStaffManagement } from '../composables/useStaffManagement'
import { useStaffFilters } from '../composables/useStaffFilters'

const router = useRouter()
const notyf = new Notyf({ position: { x: 'right', y: 'top' }, duration: 4000 })

const { staff, loading, fetchStaff, deactivateStaff, resendSetup, pagination } = useStaffManagement()
const filters = useStaffFilters()

// Confirmation modal state
const showDeactivateModal = ref(false)
const showResendModal = ref(false)
const selectedStaffId = ref<number | null>(null)

// Initial load
onMounted(() => {
  loadStaff()
})

// Watch filters and reload
watch([() => filters.search.value, () => filters.role.value, () => filters.isActive.value], () => {
  filters.resetPage()
  loadStaff()
}, { deep: true })

// Watch page changes
watch(() => filters.page.value, () => {
  loadStaff()
})

const loadStaff = async () => {
  try {
    await fetchStaff(filters.queryParams.value)
  } catch (error) {
    notyf.error('Failed to load staff members')
  }
}

const handleEdit = (id: number) => {
  router.push({ name: 'staff-edit', params: { id } })
}

const handleDeactivate = (id: number) => {
  selectedStaffId.value = id
  showDeactivateModal.value = true
}

const confirmDeactivate = async () => {
  if (!selectedStaffId.value) return

  try {
    const result = await deactivateStaff(selectedStaffId.value)
    notyf.success(result.message || 'Staff member deactivated successfully')
    await loadStaff() // Reload list
  } catch (error: any) {
    if (error.response?.status === 403) {
      notyf.error('You cannot deactivate yourself')
    } else {
      notyf.error('Failed to deactivate staff member')
    }
  } finally {
    showDeactivateModal.value = false
    selectedStaffId.value = null
  }
}

const handleResend = (id: number) => {
  selectedStaffId.value = id
  showResendModal.value = true
}

const confirmResend = async () => {
  if (!selectedStaffId.value) return

  try {
    const result = await resendSetup(selectedStaffId.value)
    notyf.success(result.message || 'Setup email resent successfully')
  } catch (error: any) {
    if (error.response?.status === 409) {
      notyf.error('This staff member has already activated their account')
    } else {
      notyf.error('Failed to resend setup email')
    }
  } finally {
    showResendModal.value = false
    selectedStaffId.value = null
  }
}

const navigateToCreate = () => {
  router.push({ name: 'staff-create' })
}

const handlePageChange = (page: number) => {
  filters.page.value = page
}
</script>

<template>
  <AppLayout>
    <div>
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p class="text-sm text-gray-500 mt-1">Manage your hotel staff members</p>
        </div>
        <button
          @click="navigateToCreate"
          class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 font-medium"
        >
          Add Staff
        </button>
      </div>

      <!-- Filters -->
      <StaffFilters
        v-model:search="filters.search.value"
        v-model:role="filters.role.value"
        v-model:is-active="filters.isActive.value"
        @reset="filters.resetFilters()"
      />

      <!-- Loading State -->
      <SkeletonTable v-if="loading" />

      <!-- Staff Table -->
      <StaffTable
        v-else-if="staff.length > 0"
        :staff="staff"
        :loading="loading"
        @edit="handleEdit"
        @deactivate="handleDeactivate"
        @resend="handleResend"
      />

      <!-- Empty State -->
      <StaffEmptyState v-else>
        <template #action>
          <button
            @click="navigateToCreate"
            class="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 font-medium"
          >
            Add Staff Member
          </button>
        </template>
      </StaffEmptyState>

      <!-- Pagination -->
      <div v-if="staff.length > 0 && pagination.last_page > 1" class="mt-6 flex justify-between items-center">
        <p class="text-sm text-gray-700">
          Showing {{ (pagination.current_page - 1) * pagination.per_page + 1 }} to 
          {{ Math.min(pagination.current_page * pagination.per_page, pagination.total) }} of 
          {{ pagination.total }} results
        </p>
        <div class="flex gap-2">
          <button
            @click="handlePageChange(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="handlePageChange(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Deactivate Confirmation Modal -->
    <ConfirmModal
      :show="showDeactivateModal"
      title="Deactivate Staff Member"
      message="Are you sure you want to deactivate this staff member? They will no longer be able to log in."
      variant="danger"
      confirm-text="Deactivate"
      @confirm="confirmDeactivate"
      @cancel="showDeactivateModal = false"
      @close="showDeactivateModal = false"
    />

    <!-- Resend Setup Confirmation Modal -->
    <ConfirmModal
      :show="showResendModal"
      title="Resend Setup Email"
      message="Are you sure you want to resend the setup email to this staff member?"
      variant="info"
      confirm-text="Resend"
      @confirm="confirmResend"
      @cancel="showResendModal = false"
      @close="showResendModal = false"
    />
  </AppLayout>
</template>
