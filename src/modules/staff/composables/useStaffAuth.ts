import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { apiClient } from '@/services/api/client'
import type { StaffLoginRequest, StaffLoginResponse } from '../types'

export function useStaffAuth() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function login(credentials: StaffLoginRequest): Promise<StaffLoginResponse> {
    loading.value = true
    error.value = null

    try {
      await apiClient.getCsrfCookie()
      const data = await apiClient.post<StaffLoginResponse>('/v1/staff/auth/login', credentials)

      // Store tenant_id as login-type indicator (staff vs owner) for session routing
      if (data.tenant_id) {
        localStorage.setItem('tenant_id', data.tenant_id)
      }

      // Sync the authenticated staff user into the auth store
      const authStore = useAuthStore()
      authStore.setUser(data.user as any)

      return data
    } catch (err: any) {
      const message = err?.error ?? err?.message ?? 'Login failed. Please check your credentials.'
      error.value = message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout(): Promise<void> {
    loading.value = true
    try {
      await apiClient.post('/v1/staff/auth/logout', {})
    } catch {
      // Proceed with local cleanup even if request fails
    } finally {
      const authStore = useAuthStore()
      authStore.clearUser()
      localStorage.removeItem('tenant_id')
      loading.value = false
    }
  }

  return { loading, error, login, logout }
}
