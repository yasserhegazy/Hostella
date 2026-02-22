import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios'
import type { ApiError } from '@/types/api'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        // Add tenant identifier if available
        const tenantId = localStorage.getItem('tenant_id')
        if (tenantId) {
          config.headers['X-Tenant'] = tenantId
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data, // Return data directly
      async (error: AxiosError<ApiError>) => {
        // Handle 401: Unauthorized
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('tenant_id')
          window.location.href = '/login'
        }

        // Handle 403: Forbidden
        if (error.response?.status === 403) {
          console.error('Forbidden: You do not have permission for this action')
        }

        // Handle 422: Validation errors
        if (error.response?.status === 422 && error.response.data.errors) {
          return Promise.reject({
            validationErrors: error.response.data.errors,
            message: error.response.data.message
          })
        }

        // Handle 500: Server errors
        if (error.response?.status && error.response.status >= 500) {
          console.error('Server error:', error.response.data)
        }

        return Promise.reject(error.response?.data || error)
      }
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config)
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config)
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put(url, data, config)
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.client.patch(url, data, config)
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config)
  }
}

export const apiClient = new ApiClient()
