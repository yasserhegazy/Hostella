<script setup lang="ts">
// No props needed, just display
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4">
    <!-- Illustration / Icon -->
    <div class="w-24 h-24 mb-6 text-gray-300">
      <!-- Heroicons UsersIcon (outline) scaled to 96x96 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-full h-full"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    </div>
    
    <!-- Message -->
    <h3 class="text-lg font-semibold text-gray-900 mb-2">
      No staff members found
    </h3>
    <p class="text-sm text-gray-500 mb-6 text-center max-w-sm">
      Get started by adding your first staff member to manage your hotel operations.
    </p>
    
    <!-- CTA Button (only if user has permission) -->
    <slot name="action">
      <!-- Default slot allows parent to override button -->
    </slot>
  </div>
</template>
