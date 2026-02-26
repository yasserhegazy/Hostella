<script setup lang="ts">
import AuthLayout from '@/components/layout/AuthLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <AuthLayout>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
      <!-- Success icon with ring -->
      <div class="relative mx-auto w-24 h-24 mb-6">
        <div class="absolute inset-0 bg-primary-light rounded-full animate-ping opacity-30" />
        <div class="relative w-24 h-24 bg-primary-light rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-2">You're All Set! 🎉</h1>
      <p class="text-gray-500 mb-8 max-w-xs mx-auto">
        Your hotel is now registered with Hostella. Log in to start managing your operations.
      </p>

      <!-- What's next -->
      <div class="bg-primary-light rounded-xl p-5 mb-8 text-left">
        <p class="text-sm font-semibold text-primary mb-3">What's next?</p>
        <ul class="space-y-2">
          <li class="flex items-start gap-2 text-sm text-gray-700">
            <svg class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Configure your hotel profile and settings
          </li>
          <li class="flex items-start gap-2 text-sm text-gray-700">
            <svg class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Add your rooms and room types
          </li>
          <li class="flex items-start gap-2 text-sm text-gray-700">
            <svg class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Start accepting reservations
          </li>
        </ul>
      </div>

      <div class="space-y-3">
        <router-link to="/login" class="block">
          <BaseButton size="lg" full-width>
            Go to Dashboard
          </BaseButton>
        </router-link>
        <router-link to="/" class="block text-sm text-gray-400 hover:text-primary transition-colors">
          Return to home
        </router-link>
      </div>
    </div>
  </AuthLayout>
</template>
