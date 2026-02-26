<script setup lang="ts">
import AuthLayout from '@/components/layout/AuthLayout.vue'
</script>

<template>
  <AuthLayout :current-step="2" show-steps>
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <!-- Email icon -->
      <div class="mx-auto w-20 h-20 bg-primary-light rounded-full flex items-center justify-center mb-6">
        <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h1>
      <p class="text-gray-500 mb-6 max-w-sm mx-auto">
        We've sent a verification link to your email address. Click the link to verify and continue your registration.
      </p>

      <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
        <div class="flex gap-3">
          <svg class="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div class="text-sm text-amber-800">
            <p class="font-medium mb-0.5">Don't see the email?</p>
            <p>Check your spam or junk folder. The verification link expires in <strong>24 hours</strong>.</p>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center gap-3">
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span>Waiting for verification</span>
          <span class="inline-flex gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style="animation-delay: 0ms" />
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style="animation-delay: 150ms" />
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style="animation-delay: 300ms" />
          </span>
        </div>

        <router-link to="/" class="text-sm text-gray-400 hover:text-primary transition-colors">
          Return to home
        </router-link>
      </div>
    </div>
  </AuthLayout>
</template>
