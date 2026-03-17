import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import { useNotifications } from '@/composables/useNotifications'
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse
} from '../types'
import { apiClient } from '@/services/api/client'

const user = ref<AuthUser | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const validationErrors = ref<Record<string, string[]>>({})
const initialized = ref(false)

export function useAuth() {
  const api = useApi()
  const notifications = useNotifications()

  const isAuthenticated = computed(() => user.value !== null)

  function clearErrors() {
    error.value = null
    validationErrors.value = {}
  }

  function handleError(err: unknown, fallbackMessage: string) {
    const typedErr = err as Record<string, unknown>
    if (typedErr?.validationErrors) {
      validationErrors.value = typedErr.validationErrors as Record<string, string[]>
      error.value = 'Please check the form for errors.'
    } else {
      const message = (typedErr?.error as string) ?? (typedErr?.message as string) ?? fallbackMessage
      error.value = message
      notifications.error(message)
    }
  }

  async function login(credentials: LoginRequest) {
    loading.value = true
    clearErrors()

    try {
      await apiClient.getCsrfCookie()
      const data = await api.post<LoginResponse>('/auth/login', credentials)
      user.value = data.user
      notifications.success('Logged in successfully')
      return data
    } catch (err: unknown) {
      handleError(err, 'Invalid credentials')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      await api.post('/auth/logout')
    } catch {
      // Proceed with local cleanup even if request fails
    } finally {
      user.value = null
      localStorage.removeItem('tenant_id')
      loading.value = false
    }
  }

  async function fetchUser() {
    try {
      const data = await api.get<AuthUser>('/auth/me')
      user.value = data
      return data
    } catch {
      user.value = null
      return null
    }
  }

  async function forgotPassword(data: ForgotPasswordRequest) {
    loading.value = true
    clearErrors()

    try {
      await apiClient.getCsrfCookie()
      const response = await api.post<ForgotPasswordResponse>('/auth/forgot-password', data)
      notifications.success(response.message)
      return response
    } catch (err: unknown) {
      handleError(err, 'Failed to send reset link')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function resetPassword(data: ResetPasswordRequest) {
    loading.value = true
    clearErrors()

    try {
      await apiClient.getCsrfCookie()
      const response = await api.post<ResetPasswordResponse>('/auth/reset-password', data)
      notifications.success(response.message)
      return response
    } catch (err: unknown) {
      handleError(err, 'Failed to reset password')
      throw err
    } finally {
      loading.value = false
    }
  }

  async function initAuth() {
    if (initialized.value) return
    initialized.value = true
    await fetchUser()
  }

  return {
    user,
    loading,
    error,
    validationErrors,
    isAuthenticated,
    login,
    logout,
    fetchUser,
    forgotPassword,
    resetPassword,
    initAuth
  }
}
