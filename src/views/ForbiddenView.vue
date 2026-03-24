<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/base/BaseButton.vue'

const router = useRouter()
const auth = useAuthStore()

function goBack() {
  router.back()
}

function goToDashboard() {
  if (auth.isOwner) {
    router.push({ name: 'dashboard' })
  } else {
    router.push({ name: 'staff-dashboard' })
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <h1 class="text-9xl font-bold text-red-600">403</h1>
      <h2 class="mt-4 text-3xl font-bold text-gray-900">
        Access Denied
      </h2>
      <p class="mt-2 text-gray-600">
        You don't have permission to access this resource.
      </p>
      
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <BaseButton @click="goBack" variant="outline">
          Go Back
        </BaseButton>
        <BaseButton @click="goToDashboard">
          Go to Dashboard
        </BaseButton>
      </div>
    </div>
  </div>
</template>
