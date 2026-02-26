import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

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
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guest: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

export default router
