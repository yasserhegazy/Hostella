<script setup lang="ts">
import { onMounted } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import LogoutButton from '@/modules/auth/components/LogoutButton.vue'
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
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50">
    <!-- Top Nav -->
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="flex items-center gap-2.5 group">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">Host<span class="text-primary">ella</span></span>
          </router-link>

          <div class="flex items-center gap-3">
            <router-link to="/" class="text-sm text-gray-500 hover:text-primary transition-colors">
              ← Back to Home
            </router-link>
            <LogoutButton />
          </div>
        </div>
      </div>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <svg class="animate-spin mx-auto h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <p class="mt-4 text-gray-500">Loading hotel profile...</p>
    </div>

    <!-- Main Content -->
    <main v-else class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
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
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-100 bg-white/50">
      <p class="text-center text-xs text-gray-400 py-4">
        © {{ new Date().getFullYear() }} Hostella. All rights reserved.
      </p>
    </footer>
  </div>
</template>
