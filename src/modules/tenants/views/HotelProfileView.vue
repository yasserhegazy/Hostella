<script setup lang="ts">
import { onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import HotelProfileHeader from '../components/profile/HotelProfileHeader.vue'
import HotelInfoSection from '../components/profile/HotelInfoSection.vue'
import HotelLocationSection from '../components/profile/HotelLocationSection.vue'
import HotelBannerUpload from '../components/profile/HotelBannerUpload.vue'
import { useHotelProfile } from '../composables/useHotelProfile'

const {
  profile,
  loading,
  saving,
  saved,
  error,
  validationErrors,
  profileImageUrl,
  loadProfile,
  saveProfile,
  stageImageUpload,
  stageImageRemoval
} = useHotelProfile()

onMounted(() => {
  loadProfile()
})

function handleBannerChange() {
  document.getElementById('banner-upload-section')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <AppLayout>
    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto py-20 text-center">
      <svg class="animate-spin mx-auto h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <p class="mt-4 text-gray-500">Loading hotel profile...</p>
    </div>

    <!-- Main Content -->
    <div v-else class="max-w-4xl mx-auto space-y-6">
      <!-- Hero Banner -->
      <HotelProfileHeader
        :hotel-name="profile.name"
        :profile-image-url="profileImageUrl"
        @change-banner="handleBannerChange"
      />

      <!-- Hotel Info -->
      <HotelInfoSection
        :name="profile.name"
        :email="profile.email"
        :phone="profile.phone"
        :description="profile.description"
        :errors="validationErrors"
        @update:name="profile.name = $event"
        @update:email="profile.email = $event"
        @update:phone="profile.phone = $event"
        @update:description="profile.description = $event"
      />

      <!-- Location -->
      <HotelLocationSection
        :location="profile.location"
        :errors="validationErrors"
        @update:location="profile.location = $event"
      />

      <!-- Banner Image Upload -->
      <div id="banner-upload-section">
        <HotelBannerUpload
          :image-url="profileImageUrl"
          :disabled="saving"
          @upload="stageImageUpload"
          @remove="stageImageRemoval"
        />
      </div>

      <!-- Error -->
      <div v-if="error" class="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-3">
        <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm text-red-700">{{ error }}</p>
      </div>

      <!-- Success -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-2"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="saved" class="rounded-xl bg-green-50 border border-green-200 px-4 py-3 flex items-start gap-3">
          <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <p class="text-sm text-green-700">Profile saved successfully!</p>
        </div>
      </transition>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3 pb-8">
        <BaseButton variant="outline" @click="loadProfile">
          Cancel
        </BaseButton>
        <BaseButton variant="primary" size="lg" :loading="saving" :disabled="saving" @click="saveProfile">
          <svg v-if="!saving" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M5 13l4 4L19 7" />
          </svg>
          Save Changes
        </BaseButton>
      </div>
    </div>
  </AppLayout>
</template>
