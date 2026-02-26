<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-bold text-gray-900">
        Login to Hostella
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Coming soon...
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <BaseCard>
        <div class="text-center py-8">
          <p class="text-gray-600 mb-6">
            Authentication module is under development. Please complete registration first.
          </p>
          
          <router-link to="/register">
            <BaseButton>
              Register Your Hotel
            </BaseButton>
          </router-link>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
