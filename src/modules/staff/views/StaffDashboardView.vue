<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import StaffLayout from '@/components/layout/StaffLayout.vue'

const authStore = useAuthStore()
</script>

<template>
  <StaffLayout>
    <div>
      <!-- Welcome Header -->
      <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {{ authStore.user?.first_name }}!
        </h1>
        <p class="text-gray-600">
          You're logged in as a staff member. Your dashboard is ready.
        </p>
      </div>

      <!-- Placeholder Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">My Tasks</h3>
          <p class="text-sm text-gray-500">View and manage your daily tasks</p>
          <p class="text-xs text-gray-400 mt-4">Coming soon</p>
        </div>

        <!-- Card 2 -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">My Schedule</h3>
          <p class="text-sm text-gray-500">Check your work schedule</p>
          <p class="text-xs text-gray-400 mt-4">Coming soon</p>
        </div>

        <!-- Card 3 -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">My Profile</h3>
          <p class="text-sm text-gray-500">Update your information</p>
          <p class="text-xs text-gray-400 mt-4">Coming soon</p>
        </div>
      </div>
    </div>
  </StaffLayout>
</template>
