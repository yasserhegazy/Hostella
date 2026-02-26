<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  value: string | number
  label: string
}

interface Props {
  modelValue: string | number
  label?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  options: Option[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  placeholder: 'Select an option'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const selectClasses = computed(() => {
  const baseClasses = 'mt-1 block w-full rounded-md shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-0'
  const errorClasses = props.error 
    ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-primary focus:ring-primary'
  const disabledClasses = props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''
  
  return `${baseClasses} ${errorClasses} ${disabledClasses}`
})

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <select
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :class="selectClasses"
      @change="handleChange"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
    
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>
