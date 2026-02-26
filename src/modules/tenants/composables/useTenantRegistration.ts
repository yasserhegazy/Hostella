import { ref } from 'vue'
import { useApi } from '@/composables/useApi'
import { useNotifications } from '@/composables/useNotifications'
import type {
  InitRegistrationRequest,
  SetPasswordRequest,
  InitRegistrationResponse,
  VerifyEmailResponse,
  SetPasswordResponse,
  Tenant,
  User
} from '../types'

/**
 * Composable for hotel/tenant registration flow
 * Handles the 3-step registration process:
 * 1. Initial registration
 * 2. Email verification
 * 3. Password setup
 */
export function useTenantRegistration() {
  const api = useApi()
  const notifications = useNotifications()
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  const validationErrors = ref<Record<string, string[]>>({})
  const tenant = ref<Tenant | null>(null)
  const user = ref<User | null>(null)
  const tenantId = ref<string | null>(null)

  /**
   * Step 1: Initialize registration
   */
  async function initRegistration(data: InitRegistrationRequest) {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      const response = await api.post<InitRegistrationResponse>(
        '/v1/hotels/init-register',
        data
      )

      tenantId.value = response.tenant_id
      notifications.success(response.message)
      return response
    } catch (err: any) {
      if (err.validationErrors) {
        validationErrors.value = err.validationErrors
        error.value = 'Please check the form for errors'
      } else {
        const errorMessage = err.message || err.error || 'Registration failed'
        error.value = errorMessage
        notifications.error(errorMessage)
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Step 2: Verify email via registration token
   */
  async function verifyEmail(token: string) {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<VerifyEmailResponse>(`/v1/hotels/verify/${token}`)

      tenantId.value = response.tenant_id
      if (response.message) {
        notifications.success(response.message)
      }

      return response
    } catch (err: any) {
      const errorMessage = err.error || err.message || 'Verification failed'
      error.value = errorMessage
      notifications.error(errorMessage)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Step 3: Set password and create owner account
   */
  async function setPassword(data: SetPasswordRequest) {
    loading.value = true
    error.value = null
    validationErrors.value = {}

    try {
      const response = await api.post<SetPasswordResponse>(
        '/v1/hotels/set-password',
        data
      )

      tenant.value = response.tenant
      user.value = response.user
      tenantId.value = response.tenant.tenant_id
      notifications.success(response.message)
      return response
    } catch (err: any) {
      if (err.validationErrors) {
        validationErrors.value = err.validationErrors
        error.value = 'Please check the form for errors'
      } else {
        const errorMessage = err.message || err.error || 'Failed to complete registration'
        error.value = errorMessage
        notifications.error(errorMessage)
      }
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    validationErrors,
    tenantId,
    tenant,
    user,
    initRegistration,
    verifyEmail,
    setPassword
  }
}
