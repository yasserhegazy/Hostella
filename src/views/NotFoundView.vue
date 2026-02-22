<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <h1 class="text-9xl font-bold text-primary">404</h1>
      <h2 class="mt-4 text-3xl font-bold text-gray-900">
        Page Not Found
      </h2>
      <p class="mt-2 text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      <div class="mt-8">
        <router-link to="/">
          <BaseButton>
            Back to Home
          </BaseButton>
        </router-link>
      </div>
    </div>
  </div>
</template>
