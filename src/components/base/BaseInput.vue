<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

interface Props {
  modelValue: string | number | undefined
  label?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  type?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()

const showPassword = ref(false)

const isPassword = computed(() => props.type === 'password')
const resolvedType = computed(() => isPassword.value && showPassword.value ? 'text' : props.type)

const inputClasses = computed(() => {
  const baseClasses = 'mt-1 block w-full rounded-md shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-0'
  const paddingRight = isPassword.value ? 'pr-10' : ''
  const errorClasses = props.error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-primary focus:ring-primary'
  const disabledClasses = props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''

  return `${baseClasses} ${paddingRight} ${errorClasses} ${disabledClasses}`
})

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
        :type="resolvedType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        v-bind="attrs"
        @input="handleInput"
      >

      <!-- Password toggle button -->
      <button
        v-if="isPassword"
        type="button"
        tabindex="-1"
        class="absolute inset-y-0 right-0 mt-1 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
        @click="showPassword = !showPassword"
      >
        <!-- Eye icon (show) -->
        <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <!-- Eye-off icon (hide) -->
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      </button>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>
