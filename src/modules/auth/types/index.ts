import type { UserRole } from '@/types/roles'

export interface AuthUser {
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
  user_type: 'owner' | 'staff'
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: AuthUser
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  status: string
}

export interface ResetPasswordRequest {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export interface ResetPasswordResponse {
  message: string
  status: string
}

export type StaffUser = AuthUser
