import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useApi } from '@/composables/useApi'
import { useNotifications } from '@/composables/useNotifications'
import type {
  AuthUser,
  LoginRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse
} from '../types'
import { apiClient } from '@/services/api/client'

const error = ref<string | null>(null)
const validationErrors = ref<Record<string, string[]>>({})

export function useAuth() {
  const authStore = useAuthStore()
  const { user, loading, isAuthenticated } = storeToRefs(authStore)
  const api = useApi()
  const notifications = useNotifications()

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
    clearErrors()

    try {
      const data = await authStore.login(credentials)
      notifications.success('Logged in successfully')
      return data
    } catch (err: unknown) {
      handleError(err, 'Invalid credentials')
      throw err
    }
  }

  async function logout() {
    await authStore.logout()
  }

  async function fetchUser() {
    try {
      const data = await api.get<AuthUser>('/auth/me')
      authStore.setUser(data)
      return data
    } catch {
      authStore.setUser(null)
      return null
    }
  }

  async function forgotPassword(data: ForgotPasswordRequest) {
    clearErrors()

    try {
      await apiClient.getCsrfCookie()
      const response = await api.post<ForgotPasswordResponse>('/auth/forgot-password', data)
      notifications.success(response.message)
      return response
    } catch (err: unknown) {
      handleError(err, 'Failed to send reset link')
      throw err
    }
  }

  async function resetPassword(data: ResetPasswordRequest) {
    clearErrors()

    try {
      await apiClient.getCsrfCookie()
      const response = await api.post<ResetPasswordResponse>('/auth/reset-password', data)
      notifications.success(response.message)
      return response
    } catch (err: unknown) {
      handleError(err, 'Failed to reset password')
      throw err
    }
  }

  async function initAuth() {
    await authStore.init()
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
