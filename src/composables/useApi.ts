import { apiClient } from '@/services/api/client'

/**
 * Composable for accessing the API client
 * Provides a simple abstraction over the HTTP client
 */
export function useApi() {
  return apiClient
}
