<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  imageUrl: string | null
  disabled?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  upload: [file: File]
  remove: []
}>()

const isDragging = ref(false)
const error = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE_MB = 2

function openFilePicker() {
  fileInput.value?.click()
}

function handleDragOver(event: DragEvent) {
  event.preventDefault()
  isDragging.value = true
}

function handleDragLeave() {
  isDragging.value = false
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) processFile(file)
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) processFile(file)
  target.value = ''
}

function processFile(file: File) {
  error.value = null

  if (!ACCEPTED_TYPES.includes(file.type)) {
    error.value = 'Please upload a JPEG, PNG, or WebP image.'
    return
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    error.value = `Image must not exceed ${MAX_SIZE_MB}MB.`
    return
  }

  previewUrl.value = URL.createObjectURL(file)
  emit('upload', file)
}

function handleRemove() {
  previewUrl.value = null
  emit('remove')
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <!-- Section Header -->
    <div class="flex items-center gap-2.5 mb-5">
      <div class="w-8 h-8 bg-secondary-light rounded-lg flex items-center justify-center">
        <svg class="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 class="text-base font-semibold text-gray-900">Profile Image</h2>
    </div>

    <!-- Current Image Preview -->
    <div v-if="previewUrl || imageUrl" class="relative mb-4 rounded-xl overflow-hidden group">
      <img
        :src="previewUrl || imageUrl!"
        alt="Hotel profile image"
        class="w-full h-48 sm:h-56 object-cover"
      >
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
        <button
          type="button"
          class="px-3 py-2 bg-white rounded-lg text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          :disabled="disabled"
          @click="openFilePicker"
        >
          Replace
        </button>
        <button
          type="button"
          class="px-3 py-2 bg-red-500 rounded-lg text-sm font-medium text-white shadow-sm hover:bg-red-600 transition-colors"
          :disabled="disabled"
          @click="handleRemove"
        >
          Remove
        </button>
      </div>
    </div>

    <!-- Upload Area (when no image) -->
    <div
      v-else
      class="relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200"
      :class="[
        isDragging
          ? 'border-primary bg-primary-light/50'
          : 'border-gray-300 hover:border-primary hover:bg-gray-50',
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      ]"
      @click="!disabled && openFilePicker()"
      @dragover="!disabled && handleDragOver($event)"
      @dragleave="handleDragLeave"
      @drop="!disabled && handleDrop($event)"
    >
      <svg class="mx-auto w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p class="text-sm text-gray-600">
        <span class="font-medium text-primary">Click to upload</span> or drag and drop
      </p>
      <p class="mt-1 text-xs text-gray-400">JPEG, PNG or WebP (max {{ MAX_SIZE_MB }}MB)</p>
    </div>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      class="hidden"
      :disabled="disabled"
      @change="handleFileChange"
    >

    <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
