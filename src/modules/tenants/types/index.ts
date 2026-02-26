// Tenant-specific TypeScript types matching Laravel backend

export interface Location {
  country_code: string
  city: string
  region_name?: string
  address_line?: string
  postal_code?: string
  timezone?: string
}

export interface Tenant {
  tenant_id: string
  name: string
  email: string
  phone: string
  slug: string
  status: 'pending_verification' | 'verified' | 'active' | 'disabled'
  owner_id: number | null
  location?: Location
  email_verified_at: string | null
  created_at: string
}

export interface InitRegistrationRequest {
  name: string
  email: string
  phone: string
  location: Location
}

export interface SetPasswordRequest {
  token: string
  first_name: string
  last_name: string
  password: string
  password_confirmation: string
}

export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  email_verified_at: string | null
  created_at: string
}

export interface InitRegistrationResponse {
  tenant_id: string
  message: string
}

export interface VerifyEmailResponse {
  tenant_id: string
  message: string
}

export interface SetPasswordResponse {
  message: string
  tenant: Tenant
  user: User
}
