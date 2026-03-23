import type { UserRole } from '@/types/roles'

/**
 * Staff User - Same as AuthUser (from backend TenantUser)
 */
export interface StaffUser {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string | null
  preferred_language: string
  is_active: boolean
  activated_at: string | null
  last_login_at: string | null
  roles: UserRole[]
  created_at: string
  updated_at: string
}

/**
 * Request payload for creating staff
 */
export interface CreateStaffRequest {
  first_name: string
  last_name: string
  email: string
  phone?: string
  preferred_language?: string
  roles: UserRole[]
}

/**
 * Request payload for updating staff
 */
export interface UpdateStaffRequest {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string | null
  preferred_language?: string
  roles?: UserRole[]
}

/**
 * Filter parameters for staff list
 */
export interface StaffFilters {
  search?: string
  role?: UserRole
  is_active?: boolean
  page?: number
  per_page?: number
}

/**
 * Pagination metadata from backend
 */
export interface PaginationMeta {
  current_page: number
  per_page: number
  total: number
  last_page: number
}

/**
 * API response for staff list (paginated)
 */
export interface StaffListResponse {
  data: StaffUser[]
  meta: PaginationMeta
}

/**
 * API response for single staff operations (create/update)
 */
export interface StaffResponse {
  message: string
  data: StaffUser
}

/**
 * API response for delete operation
 */
export interface StaffDeleteResponse {
  message: string
}

/**
 * API validation error structure (422 response)
 */
export interface ValidationErrors {
  [key: string]: string[]
}

/**
 * Setup password request
 */
export interface SetupPasswordRequest {
  email: string
  token: string
  password: string
  password_confirmation: string
}

/**
 * Setup password response
 */
export interface SetupPasswordResponse {
  message: string
}
