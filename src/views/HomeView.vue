<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg class="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900">Host<span class="text-primary">ella</span></span>
          </div>

          <div class="flex items-center gap-3">
            <router-link to="/register" class="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Register Hotel
            </router-link>
            <router-link to="/login">
              <BaseButton variant="primary" size="sm">Sign In</BaseButton>
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-slate-50">
      <!-- Decorative blobs -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/4" />

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div class="max-w-3xl mx-auto text-center">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-medium mb-6">
            <span class="w-1.5 h-1.5 rounded-full bg-primary" />
            Multi-tenant Hotel Management
          </span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Manage Your Hotel
            <span class="text-primary block">Smarter & Faster</span>
          </h1>
          <p class="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            Streamline reservations, rooms, guests, and operations — all from one powerful dashboard built for modern hotels.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <router-link to="/register">
              <BaseButton size="lg" class="w-full sm:w-auto">
                Get Started Free
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </BaseButton>
            </router-link>
            <BaseButton variant="outline" size="lg" class="w-full sm:w-auto">
              Watch Demo
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="border-y border-gray-100 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div class="text-center">
            <p class="text-3xl font-bold text-gray-900">500+</p>
            <p class="text-sm text-gray-500 mt-1">Hotels Registered</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-gray-900">50k+</p>
            <p class="text-sm text-gray-500 mt-1">Reservations Managed</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-gray-900">99.9%</p>
            <p class="text-sm text-gray-500 mt-1">Uptime SLA</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-bold text-gray-900">24/7</p>
            <p class="text-sm text-gray-500 mt-1">Support Available</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">Everything You Need</h2>
        <p class="text-gray-500 max-w-xl mx-auto">One platform to run your entire hotel — from check-in to checkout and beyond.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Feature 1 -->
        <div class="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
          <div class="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Reservation Management</h3>
          <p class="text-sm text-gray-500 leading-relaxed">
            Real-time booking, intelligent room allocation, and seamless guest check-in/check-out flows.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
          <div class="w-12 h-12 bg-secondary-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Multi-Tenant Architecture</h3>
          <p class="text-sm text-gray-500 leading-relaxed">
            Each hotel gets its own isolated data environment with independent configuration and scalability.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="group p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200">
          <div class="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Multi-Language Support</h3>
          <p class="text-sm text-gray-500 leading-relaxed">
            Full Arabic RTL and English LTR support built-in, ready for global hotel chains.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-gradient-to-r from-primary to-primary-dark">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">Ready to modernize your hotel?</h2>
        <p class="text-emerald-100 mb-8 max-w-xl mx-auto">
          Join hundreds of hotels already using Hostella to streamline their operations.
        </p>
        <router-link to="/register">
          <BaseButton variant="outline" size="lg" class="border-white text-white hover:bg-white hover:text-primary">
            Register Your Hotel — It's Free
          </BaseButton>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span class="text-sm font-semibold text-gray-900">Hostella</span>
          </div>
          <p class="text-xs text-gray-400">© {{ new Date().getFullYear() }} Hostella. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
