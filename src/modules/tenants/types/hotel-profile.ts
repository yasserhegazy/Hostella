import type { Location } from './index'

export interface HotelProfile {
  tenantId: string
  name: string
  email: string
  phone: string
  description: string
  slug: string
  status: string
  profileImageUrl: string | null
  location: Location
}
