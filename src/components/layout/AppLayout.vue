<script setup lang="ts">
import { ref } from 'vue'
import TopNav from './TopNav.vue'
import Sidebar from './Sidebar.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Top Navigation (always visible) -->
    <TopNav @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    
    <!-- Sidebar + Main Content -->
    <div class="flex">
      <!-- Sidebar Component -->
      <Sidebar v-model="sidebarOpen" />
      
      <!-- Main Content Area -->
      <main class="flex-1 lg:ml-64">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
