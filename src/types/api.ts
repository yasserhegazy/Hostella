// Global TypeScript types for API responses and common structures

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface ApiError {
  error?: string
  message: string
  errors?: Record<string, string[]> // Validation errors
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    per_page: number
    total: number
    last_page: number
  }
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
}
