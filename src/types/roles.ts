export const UserRole = {
  HOTEL_ADMIN: 'hotel_admin',
  MANAGER: 'manager',
  RECEPTIONIST: 'receptionist',
  HOUSEKEEPER: 'housekeeper'
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]
