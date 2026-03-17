import { ref, computed } from 'vue'
import { useApi } from '@/composables/useApi'
import { useNotifications } from '@/composables/useNotifications'
import type { HotelProfile } from '../types/hotel-profile'

interface ProfileApiResponse extends Record<string, unknown> {
  tenant_id: string
  name: string
  email: string
  phone: string
  description: string | null
  slug: string
  status: string
  profile_image_url: string | null
  location: {
    country_code: string
    city: string
    country_name?: string
    region_name?: string
    address_line?: string
    postal_code?: string
    timezone?: string
  }
}

interface UpdateApiResponse extends Record<string, unknown> {
  message: string
  tenant: ProfileApiResponse
}

function mapApiToProfile(data: ProfileApiResponse): HotelProfile {
  return {
    tenantId: data.tenant_id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    description: data.description ?? '',
    slug: data.slug,
    status: data.status,
    profileImageUrl: data.profile_image_url,
    location: {
      country_code: data.location.country_code,
      city: data.location.city,
      region_name: data.location.region_name ?? '',
      address_line: data.location.address_line ?? '',
      postal_code: data.location.postal_code ?? '',
      timezone: data.location.timezone ?? ''
    }
  }
}

/**
 * Composable for hotel profile management.
 * Handles loading, saving, and image upload via the API.
 */
export function useHotelProfile() {
  const api = useApi()
  const notifications = useNotifications()

  const profile = ref<HotelProfile>({
    tenantId: '',
    name: '',
    email: '',
    phone: '',
    description: '',
    slug: '',
    status: '',
    profileImageUrl: null,
    location: {
      country_code: '',
      city: '',
      region_name: '',
      address_line: '',
      postal_code: '',
      timezone: ''
    }
  })

  const loading = ref(false)
  const saving = ref(false)
  const saved = ref(false)
  const error = ref<string | null>(null)
  const validationErrors = ref<Record<string, string[]>>({})
  const pendingImageFile = ref<File | null>(null)
  const removeImage = ref(false)

  const profileImageUrl = computed(() => profile.value.profileImageUrl)

  async function loadProfile() {
    loading.value = true
    error.value = null
    try {
      const data = await api.get<ProfileApiResponse>('/v1/hotels/profile')
      profile.value = mapApiToProfile(data)
    } catch (err: unknown) {
      const message = (err as Record<string, string>)?.message ?? 'Failed to load hotel profile'
      error.value = message
      notifications.error(message)
    } finally {
      loading.value = false
    }
  }

  async function saveProfile() {
    saving.value = true
    saved.value = false
    error.value = null
    validationErrors.value = {}

    try {
      const formData = new FormData()
      formData.append('_method', 'PATCH')
      formData.append('name', profile.value.name)
      formData.append('email', profile.value.email)
      formData.append('phone', profile.value.phone)
      formData.append('description', profile.value.description ?? '')
      formData.append('location[country_code]', profile.value.location.country_code)
      formData.append('location[city]', profile.value.location.city)
      formData.append('location[region_name]', profile.value.location.region_name ?? '')
      formData.append('location[address_line]', profile.value.location.address_line ?? '')
      formData.append('location[postal_code]', profile.value.location.postal_code ?? '')
      formData.append('location[timezone]', profile.value.location.timezone ?? '')

      if (pendingImageFile.value) {
        formData.append('profile_image', pendingImageFile.value)
      }
      if (removeImage.value) {
        formData.append('remove_profile_image', '1')
      }

      const data = await api.post<UpdateApiResponse>(
        `/v1/hotels/${profile.value.tenantId}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      profile.value = mapApiToProfile(data.tenant)
      pendingImageFile.value = null
      removeImage.value = false
      saved.value = true
      notifications.success(data.message)
      setTimeout(() => { saved.value = false }, 3000)
    } catch (err: unknown) {
      const typedErr = err as Record<string, unknown>
      if (typedErr?.validationErrors) {
        validationErrors.value = typedErr.validationErrors as Record<string, string[]>
        error.value = 'Please check the form for errors.'
      } else {
        const message = (typedErr?.message as string) ?? 'Failed to save hotel profile'
        error.value = message
        notifications.error(message)
      }
    } finally {
      saving.value = false
    }
  }

  function stageImageUpload(file: File) {
    pendingImageFile.value = file
    removeImage.value = false
  }

  function stageImageRemoval() {
    pendingImageFile.value = null
    removeImage.value = true
    profile.value.profileImageUrl = null
  }

  return {
    profile,
    loading,
    saving,
    saved,
    error,
    validationErrors,
    profileImageUrl,
    loadProfile,
    saveProfile,
    stageImageUpload,
    stageImageRemoval
  }
}
