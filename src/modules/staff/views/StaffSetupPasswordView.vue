<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useStaffManagement } from '../composables/useStaffManagement'

const route = useRoute()
const router = useRouter()
const notyf = new Notyf({ position: { x: 'right', y: 'top' }, duration: 4000 })

const { loading, validationErrors, setupPassword } = useStaffManagement()

// Get token and email from query params
const token = ref('')
const emailParam = ref('')

onMounted(() => {
  token.value = route.query.token as string || ''
  emailParam.value = route.query.email as string || ''

  if (!token.value || !emailParam.value) {
    notyf.error('Invalid setup link. Please check your email.')
  }
})

// Validation schema
const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  password_confirmation: yup.string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
})

// Form
const { errors, defineField, handleSubmit, setErrors } = useForm({
  validationSchema: schema,
  initialValues: {
    email: emailParam.value,
    password: '',
    password_confirmation: ''
  }
})

const [email] = defineField('email')
const [password] = defineField('password')
const [passwordConfirmation] = defineField('password_confirmation')

// Watch backend errors
watch(() => validationErrors.value, (newErrors) => {
  if (newErrors) {
    const formattedErrors: Record<string, string> = {}
    Object.keys(newErrors).forEach(key => {
      const errorArray = newErrors[key]
      if (errorArray && errorArray.length > 0 && errorArray[0]) {
        formattedErrors[key] = errorArray[0]
      }
    })
    setErrors(formattedErrors)
  }
}, { deep: true })

const onSubmit = handleSubmit(async (values) => {
  try {
    const result = await setupPassword({
      email: values.email,
      token: token.value,
      password: values.password,
      password_confirmation: values.password_confirmation
    })
    
    notyf.success(result.message || 'Password set successfully. Please log in.')
    router.push({ name: 'login' })
  } catch (error: any) {
    if (error.response?.status === 422) {
      // Validation errors handled by watcher
      return
    }
    
    if (error.response?.status === 400 || error.response?.status === 404) {
      notyf.error('Invalid or expired setup link. Please request a new one.')
    } else {
      notyf.error('Failed to setup password. Please try again.')
    }
  }
})
</script>

<template>
  <AuthLayout>
    <div class="max-w-md mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Setup Your Password</h2>
        <p class="text-sm text-gray-600 mt-2">
          Create a password to activate your account
        </p>
      </div>

      <form @submit="onSubmit" class="space-y-6">
        <!-- Email (read-only) -->
        <BaseInput
          v-model="email"
          label="Email"
          type="email"
          required
          disabled
          :error="errors.email"
        />

        <!-- Password -->
        <BaseInput
          v-model="password"
          label="Password"
          type="password"
          required
          :error="errors.password"
          placeholder="Enter password (min 8 characters)"
        />

        <!-- Confirm Password -->
        <BaseInput
          v-model="passwordConfirmation"
          label="Confirm Password"
          type="password"
          required
          :error="errors.password_confirmation"
          placeholder="Confirm your password"
        />

        <!-- Submit Button -->
        <BaseButton type="submit" :loading="loading" class="w-full">
          Setup Password
        </BaseButton>
      </form>

      <p class="text-center text-sm text-gray-600 mt-6">
        Already have an account? 
        <router-link to="/login" class="text-emerald-600 hover:text-emerald-700 font-medium">
          Sign in
        </router-link>
      </p>
    </div>
  </AuthLayout>
</template>
