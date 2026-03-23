<script setup lang="ts">
import type { UserRole } from '@/types/roles'

defineProps<{
  role: UserRole
}>()

const roleColors: Record<string, string> = {
  'hotel_admin': 'bg-purple-100 text-purple-800',
  'manager': 'bg-blue-100 text-blue-800',
  'receptionist': 'bg-emerald-100 text-emerald-800',
  'housekeeper': 'bg-amber-100 text-amber-800'
}

const roleLabels: Record<string, string> = {
  'hotel_admin': 'Hotel Admin',
  'manager': 'Manager',
  'receptionist': 'Receptionist',
  'housekeeper': 'Housekeeper'
}

const getColorClass = (role: UserRole) => roleColors[role] || 'bg-gray-100 text-gray-800'
const getLabel = (role: UserRole) => roleLabels[role] || role
</script>

<template>
  <span 
    :class="[
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
      getColorClass(role)
    ]"
  >
    {{ getLabel(role) }}
  </span>
</template>
