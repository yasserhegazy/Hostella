import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/modules/auth/composables/useAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/modules/tenants/views/RegisterView.vue'),
      meta: { guest: true }
    },
    {
      path: '/registration/pending',
      name: 'registration-pending',
      component: () => import('@/modules/tenants/views/RegistrationPendingView.vue'),
      meta: { guest: true }
    },
    {
      path: '/verify/:token',
      name: 'verify-email',
      component: () => import('@/modules/tenants/views/VerifyEmailView.vue'),
      meta: { guest: true }
    },
    {
      path: '/set-password/:token',
      name: 'set-password',
      component: () => import('@/modules/tenants/views/SetPasswordView.vue'),
      meta: { guest: true }
    },
    {
      path: '/registration/complete',
      name: 'registration-complete',
      component: () => import('@/modules/tenants/views/RegistrationCompleteView.vue'),
      meta: { guest: true }
    },
    {
      path: '/hotel/profile',
      name: 'hotel-profile',
      component: () => import('@/modules/tenants/views/HotelProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/modules/auth/views/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/modules/auth/views/ForgotPasswordView.vue'),
      meta: { guest: true }
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: () => import('@/modules/auth/views/ResetPasswordView.vue'),
      meta: { guest: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const { isAuthenticated, initAuth, fetchUser } = useAuth()
  await initAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Retry once in case initial auth bootstrap raced with cookie/session hydration.
    await fetchUser()
    if (!isAuthenticated.value) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }
  }

  if (to.meta.guest && isAuthenticated.value) {
    return { name: 'hotel-profile' }
  }
})

export default router
