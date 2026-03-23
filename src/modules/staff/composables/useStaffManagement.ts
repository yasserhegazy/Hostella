import { ref } from 'vue'
import { apiClient } from '@/services/api/client'
import type {
  StaffUser,
  StaffListResponse,
  StaffResponse,
  CreateStaffRequest,
  UpdateStaffRequest,
  ValidationErrors,
  SetupPasswordRequest,
  SetupPasswordResponse
} from '../types'

export function useStaffManagement() {
  // State
  const staff = ref<StaffUser[]>([])
  const staffMember = ref<StaffUser | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const validationErrors = ref<ValidationErrors>({})
  const pagination = ref({
    current_page: 1,
    per_page: 15,
    total: 0,
    last_page: 1
  })

  /**
   * Fetch paginated staff list with filters
   */
  const fetchStaff = async (filters?: {
    search?: string
    role?: string
    is_active?: boolean
    page?: number
    per_page?: number
  }) => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      const params = new URLSearchParams()
      if (filters?.search) params.append('search', filters.search)
      if (filters?.role) params.append('role', filters.role)
      if (filters?.is_active !== undefined) params.append('is_active', filters.is_active ? '1' : '0')
      if (filters?.page) params.append('page', filters.page.toString())
      if (filters?.per_page) params.append('per_page', filters.per_page.toString())

      const queryString = params.toString()
      const url = `/v1/staff${queryString ? `?${queryString}` : ''}`
      
      const response = await apiClient.get<StaffListResponse>(url)
      
      staff.value = response.data
      pagination.value = response.meta

      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch staff'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch single staff member by ID
   */
  const fetchStaffMember = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await apiClient.get<StaffResponse>(`/v1/staff/${id}`)
      staffMember.value = response.data
      return response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch staff member'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Create new staff member
   */
  const createStaff = async (data: CreateStaffRequest) => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      const response = await apiClient.post<StaffResponse>('/v1/staff', data)
      return response
    } catch (err: any) {
      if (err.validationErrors) {
        validationErrors.value = err.validationErrors
      }
      error.value = err.message || 'Failed to create staff member'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update existing staff member
   */
  const updateStaff = async (id: number, data: UpdateStaffRequest) => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      const response = await apiClient.patch<StaffResponse>(`/v1/staff/${id}`, data)
      return response
    } catch (err: any) {
      if (err.validationErrors) {
        validationErrors.value = err.validationErrors
      }
      error.value = err.message || 'Failed to update staff member'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Deactivate staff member
   */
  const deactivateStaff = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await apiClient.delete<{ message: string }>(`/v1/staff/${id}`)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to deactivate staff member'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Resend setup email to staff member
   */
  const resendSetup = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const response = await apiClient.post<{ message: string }>(`/v1/staff/${id}/resend-setup`)
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to resend setup email'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Setup password for staff member (public endpoint)
   */
  const setupPassword = async (data: SetupPasswordRequest) => {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      const response = await apiClient.post<SetupPasswordResponse>('/v1/staff/setup-password', data)
      return response
    } catch (err: any) {
      if (err.validationErrors) {
        validationErrors.value = err.validationErrors
      }
      error.value = err.message || 'Failed to setup password'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    staff,
    staffMember,
    loading,
    error,
    validationErrors,
    pagination,
    // Actions
    fetchStaff,
    fetchStaffMember,
    createStaff,
    updateStaff,
    deactivateStaff,
    resendSetup,
    setupPassword
  }
}
