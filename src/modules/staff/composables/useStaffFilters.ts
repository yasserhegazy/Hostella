import { ref, computed } from 'vue'
import type { StaffFilters } from '../types'
import type { UserRole } from '@/types/roles'

export function useStaffFilters() {
  // Filter state
  const search = ref('')
  const role = ref<UserRole | undefined>(undefined)
  const isActive = ref<boolean | undefined>(undefined)
  const page = ref(1)
  const perPage = ref(15)

  /**
   * Computed query parameters object
   */
  const queryParams = computed<StaffFilters>(() => {
    const params: StaffFilters = {
      page: page.value,
      per_page: perPage.value
    }

    if (search.value.trim()) {
      params.search = search.value.trim()
    }

    if (role.value) {
      params.role = role.value
    }

    if (isActive.value !== undefined) {
      params.is_active = isActive.value
    }

    return params
  })

  /**
   * Reset all filters to defaults
   */
  const resetFilters = () => {
    search.value = ''
    role.value = undefined
    isActive.value = undefined
    page.value = 1
  }

  /**
   * Reset page to 1 (useful when other filters change)
   */
  const resetPage = () => {
    page.value = 1
  }

  /**
   * Check if any filter is active
   */
  const hasActiveFilters = computed(() => {
    return !!(search.value || role.value || isActive.value !== undefined)
  })

  return {
    // State
    search,
    role,
    isActive,
    page,
    perPage,
    // Computed
    queryParams,
    hasActiveFilters,
    // Actions
    resetFilters,
    resetPage
  }
}
