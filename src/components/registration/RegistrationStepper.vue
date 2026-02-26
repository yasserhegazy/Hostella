<script setup lang="ts">
interface Props {
  currentStep: 1 | 2 | 3
}

defineProps<Props>()

const steps = [
  { number: 1, label: 'Hotel Info' },
  { number: 2, label: 'Verify Email' },
  { number: 3, label: 'Set Password' }
]
</script>

<template>
  <div class="flex items-center justify-center py-4">
    <div class="flex items-center gap-0">
      <template v-for="(step, index) in steps" :key="step.number">
        <!-- Step circle -->
        <div class="flex flex-col items-center">
          <div
            class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-300"
            :class="{
              'bg-primary border-primary text-white shadow-md shadow-primary/25': currentStep === step.number,
              'bg-primary border-primary text-white': currentStep > step.number,
              'bg-white border-gray-300 text-gray-400': currentStep < step.number
            }"
          >
            <!-- Checkmark for completed steps -->
            <svg
              v-if="currentStep > step.number"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span v-else>{{ step.number }}</span>
          </div>
          <span
            class="mt-1.5 text-xs font-medium transition-colors duration-300 whitespace-nowrap"
            :class="currentStep >= step.number ? 'text-primary' : 'text-gray-400'"
          >
            {{ step.label }}
          </span>
        </div>

        <!-- Connector line (except after last step) -->
        <div
          v-if="index < steps.length - 1"
          class="w-16 sm:w-24 h-0.5 mb-5 transition-all duration-500"
          :class="currentStep > step.number ? 'bg-primary' : 'bg-gray-200'"
        />
      </template>
    </div>
  </div>
</template>
