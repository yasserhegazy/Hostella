<script setup lang="ts">
import { computed, useAttrs } from 'vue'

interface Props {
  modelValue: string | undefined
  label?: string
  error?: string
  hint?: string
  required?: boolean
  disabled?: boolean
  placeholder?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
  rows: 4
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const attrs = useAttrs()

const textareaClasses = computed(() => {
  const baseClasses = 'mt-1 block w-full rounded-md shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-0 resize-y'
  const errorClasses = props.error
    ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-primary focus:ring-primary'
  const disabledClasses = props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''

  return `${baseClasses} ${errorClasses} ${disabledClasses}`
})

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      :class="textareaClasses"
      v-bind="attrs"
      @input="handleInput"
    />

    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>
