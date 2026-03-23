<script setup lang="ts">
import type { StaffUser } from '../types'
import StaffStatusBadge from './StaffStatusBadge.vue'
import StaffRoleBadge from './StaffRoleBadge.vue'

defineProps<{
  staff: StaffUser[]
  loading: boolean
}>()

const emit = defineEmits<{
  edit: [id: number]
  deactivate: [id: number]
  resend: [id: number]
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <!-- Desktop Table View -->
    <table class="hidden md:table min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roles</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="member in staff" :key="member.id" class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900">
              {{ member.first_name }} {{ member.last_name }}
            </div>
            <div v-if="member.phone" class="text-sm text-gray-500">{{ member.phone }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ member.email }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex flex-wrap gap-1">
              <StaffRoleBadge v-for="role in member.roles" :key="role" :role="role" />
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <StaffStatusBadge :is-active="member.is_active" />
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button @click="emit('edit', member.id)" class="text-emerald-600 hover:text-emerald-900 mr-3">
              Edit
            </button>
            <button v-if="member.is_active" @click="emit('deactivate', member.id)" class="text-red-600 hover:text-red-900 mr-3">
              Deactivate
            </button>
            <button v-if="!member.is_active && !member.activated_at" @click="emit('resend', member.id)" class="text-blue-600 hover:text-blue-900">
              Resend Setup
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Mobile Card View -->
    <div class="md:hidden space-y-4">
      <div v-for="member in staff" :key="member.id" class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="flex justify-between items-start mb-3">
          <div>
            <h3 class="text-sm font-semibold text-gray-900">
              {{ member.first_name }} {{ member.last_name }}
            </h3>
            <p class="text-sm text-gray-500">{{ member.email }}</p>
            <p v-if="member.phone" class="text-sm text-gray-500">{{ member.phone }}</p>
          </div>
          <StaffStatusBadge :is-active="member.is_active" />
        </div>
        
        <div class="mb-3">
          <div class="flex flex-wrap gap-1">
            <StaffRoleBadge v-for="role in member.roles" :key="role" :role="role" />
          </div>
        </div>
        
        <div class="flex gap-2 pt-3 border-t border-gray-200">
          <button @click="emit('edit', member.id)" class="text-sm text-emerald-600 hover:text-emerald-900 font-medium">
            Edit
          </button>
          <button v-if="member.is_active" @click="emit('deactivate', member.id)" class="text-sm text-red-600 hover:text-red-900 font-medium">
            Deactivate
          </button>
          <button v-if="!member.is_active && !member.activated_at" @click="emit('resend', member.id)" class="text-sm text-blue-600 hover:text-blue-900 font-medium">
            Resend Setup
          </button>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-if="!loading && staff.length === 0" class="text-center py-12">
      <p class="text-gray-500">No staff members found</p>
    </div>
  </div>
</template>
