import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuth } from '@/modules/auth/composables/useAuth'
import { useAuthStore } from '@/stores/auth'
import { UserRole } from '@/types/roles'
import type { UserRole as UserRoleType } from '@/types/roles'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    guest?: boolean
    ownerOnly?: boolean
    roles?: UserRoleType[]
  }
}

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
      meta: { requiresAuth: true, ownerOnly: true }
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
    // Staff Management Routes (Owner/Manager only)
    {
      path: '/staff',
      name: 'staff-list',
      component: () => import('@/modules/staff/views/StaffListView.vue'),
      meta: { 
        requiresAuth: true,
        roles: [UserRole.HOTEL_ADMIN, UserRole.MANAGER]
      }
    },
    {
      path: '/staff/create',
      name: 'staff-create',
      component: () => import('@/modules/staff/views/CreateStaffView.vue'),
      meta: { 
        requiresAuth: true,
        roles: [UserRole.HOTEL_ADMIN, UserRole.MANAGER]
      }
    },
    {
      path: '/staff/:id/edit',
      name: 'staff-edit',
      component: () => import('@/modules/staff/views/EditStaffView.vue'),
      meta: { 
        requiresAuth: true,
        roles: [UserRole.HOTEL_ADMIN, UserRole.MANAGER]
      }
    },
    // Staff Dashboard (for staff members)
    {
      path: '/staff-dashboard',
      name: 'staff-dashboard',
      component: () => import('@/modules/staff/views/StaffDashboardView.vue'),
      meta: { 
        requiresAuth: true,
        roles: [UserRole.RECEPTIONIST, UserRole.HOUSEKEEPER]
      }
    },
    // Staff Setup Password (public route - no auth required)
    {
      path: '/staff/setup-password',
      name: 'staff-setup-password',
      component: () => import('@/modules/staff/views/StaffSetupPasswordView.vue'),
      meta: { 
        guest: true
      }
    },
    // Staff Login (separate login page for hotel staff members)
    {
      path: '/staff/login',
      name: 'staff-login',
      component: () => import('@/modules/staff/views/StaffLoginView.vue'),
      meta: { guest: true }
    },
    // Owner Dashboard
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { 
        requiresAuth: true,
        roles: [UserRole.HOTEL_ADMIN, UserRole.MANAGER]
      }
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: () => import('@/views/ForbiddenView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  const { isAuthenticated, initAuth, fetchUser } = useAuth()
  const auth = useAuthStore()
  
  await initAuth()

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Retry once in case initial auth bootstrap raced with cookie/session hydration.
    await fetchUser()
    if (!isAuthenticated.value) {
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }

  // Initialize auth store if not initialized
  if (!auth.initialized) {
    await auth.init()
  }

  // Check role requirements (owners bypass — they have full access)
  if (to.meta.roles && Array.isArray(to.meta.roles) && !auth.isOwner) {
    if (!auth.hasAnyRole(to.meta.roles as UserRoleType[])) {
      return next({ name: 'forbidden' })
    }
  }

  // Owner-only routes — block staff entirely
  if (to.meta.ownerOnly && !auth.isOwner) {
    return next({ name: 'forbidden' })
  }

  // Redirect authenticated users away from guest routes
  if (to.meta.guest && isAuthenticated.value) {
    if (auth.isOwner) {
      return next({ name: 'dashboard' })
    }
    return next({ name: 'staff-dashboard' })
  }

  next()
})

export default router
