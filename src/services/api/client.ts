import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from 'axios'
import type { ApiError } from '@/types/api'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
      timeout: 15000,
      withCredentials: true,
      withXSRFToken: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const tenantId = localStorage.getItem('tenant_id')
        if (tenantId) {
          config.headers['X-Tenant'] = tenantId
        }

        return config
      },
      (error) => Promise.reject(error)
    )

    this.client.interceptors.response.use(
      (response) => response.data,
      async (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          return Promise.reject({
            ...(error.response?.data ?? {}),
            status: 401,
            unauthorized: true
          })
        }

        if (error.response?.status === 403) {
          console.error('Forbidden: You do not have permission for this action')
        }

        if (error.response?.status === 422 && error.response.data.errors) {
          return Promise.reject({
            validationErrors: error.response.data.errors,
            message: error.response.data.message
          })
        }

        if (error.response?.status && error.response.status >= 500) {
          console.error('Server error:', error.response.data)
        }

        return Promise.reject(error.response?.data || error)
      }
    )
  }

  async getCsrfCookie(): Promise<void> {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '/api'
    const origin = /^https?:\/\//.test(baseUrl) ? new URL(baseUrl).origin : ''
    await axios.get(`${origin}/sanctum/csrf-cookie`, { withCredentials: true })
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
