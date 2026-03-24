import { defineStore } from 'pinia'
import { ref, computed, type Ref } from 'vue'
import type { AuthUser, LoginRequest, LoginResponse } from '@/modules/auth/types'
import { UserRole } from '@/types/roles'
import { apiClient } from '@/services/api/client'
import { useApi } from '@/composables/useApi'

export const useAuthStore = defineStore('auth', () => {
  const api = useApi()
  
  // State
  const user: Ref<AuthUser | null> = ref(null)
  const initialized: Ref<boolean> = ref(false)
  const loading: Ref<boolean> = ref(false)

  // Getters/Computed
  const isAuthenticated = computed(() => user.value !== null)

  const roles = computed(() => user.value?.roles ?? [])

  const isOwner = computed(() => {
    if (!user.value) return false
    return user.value.user_type === 'owner'
  })

  // Actions
  function hasRole(role: UserRole): boolean {
    return roles.value.includes(role)
  }

  function hasAnyRole(requiredRoles: UserRole[]): boolean {
    if (!user.value) return false
    if (isOwner.value) return true
    return requiredRoles.some(role => roles.value.includes(role))
  }

  function hasAllRoles(requiredRoles: UserRole[]): boolean {
    if (!user.value) return false
    if (isOwner.value) return true
    return requiredRoles.every(role => roles.value.includes(role))
  }

  async function fetchUser() {
    try {
      // Staff sessions store tenant_id in localStorage — use the staff me endpoint
      const isStaff = !!localStorage.getItem('tenant_id')
      const endpoint = isStaff ? '/v1/staff/auth/me' : '/auth/me'
      const data = await api.get<AuthUser>(endpoint)
      user.value = data

      return data
    } catch {
      user.value = null
      // If staff auth failed, clear stale tenant indicator
      localStorage.removeItem('tenant_id')
      return null
    }
  }

  async function init() {
    if (initialized.value) return
    
    initialized.value = true
    loading.value = true

    try {
      await fetchUser()
    } finally {
      loading.value = false
    }
  }

  async function login(credentials: LoginRequest) {
    loading.value = true

    try {
      await apiClient.getCsrfCookie()
      const data = await apiClient.post<LoginResponse>('/auth/login', credentials)
      user.value = data.user

      return data
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true

    try {
      // Staff sessions use the staff logout endpoint
      const isStaff = !!localStorage.getItem('tenant_id')
      const endpoint = isStaff ? '/v1/staff/auth/logout' : '/auth/logout'
      await api.post(endpoint)
    } catch {
      // Proceed with local cleanup even if request fails
    } finally {
      user.value = null
      localStorage.removeItem('tenant_id')
      loading.value = false
    }
  }

  function setUser(authUser: AuthUser | null) {
    user.value = authUser
  }

  function clearUser() {
    user.value = null
  }

  return {
    // State
    user,
    initialized,
    loading,
    // Getters/Computed
    isAuthenticated,
    isOwner,
    roles,
    // Actions
    hasRole,
    hasAnyRole,
    hasAllRoles,
    fetchUser,
    init,
    login,
    logout,
    setUser,
    clearUser
  }
})
