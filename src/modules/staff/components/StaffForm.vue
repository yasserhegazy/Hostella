<script setup lang="ts">
import { watch, computed } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import type { StaffUser } from '../types'
import type { CreateStaffRequest, UpdateStaffRequest } from '../types'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps<{
  staff?: StaffUser | null
  loading: boolean
  validationErrors?: Record<string, string[]>
}>()

const emit = defineEmits<{
  submit: [data: CreateStaffRequest | UpdateStaffRequest]
  cancel: []
}>()

const isEditMode = computed(() => !!props.staff)

// Schema
const schema = yup.object({
  first_name: yup.string().required('First name is required').max(64, 'First name must not exceed 64 characters'),
  last_name: yup.string().required('Last name is required').max(64, 'Last name must not exceed 64 characters'),
  email: yup.string().required('Email is required').email('Invalid email format').max(128, 'Email must not exceed 128 characters'),
  phone: yup.string().nullable().max(32, 'Phone must not exceed 32 characters'),
  preferred_language: yup.string().oneOf(['en', 'es', 'fr'], 'Invalid language').required(),
  roles: yup.array().of(yup.string()).min(1, 'At least one role is required').required()
})

// Form
const { values, errors, defineField, handleSubmit, setErrors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues: {
    first_name: props.staff?.first_name || '',
    last_name: props.staff?.last_name || '',
    email: props.staff?.email || '',
    phone: props.staff?.phone || '',
    preferred_language: props.staff?.preferred_language || 'en',
    roles: props.staff?.roles || []
  }
})

// Define fields
const [firstName] = defineField('first_name')
const [lastName] = defineField('last_name')
const [email] = defineField('email')
const [phone] = defineField('phone')
const [preferredLanguage] = defineField('preferred_language')

// Watch backend errors
watch(() => props.validationErrors, (newErrors) => {
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

// Role options
const roleOptions = [
  { value: 'hotel_admin', label: 'Hotel Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'receptionist', label: 'Receptionist' },
  { value: 'housekeeper', label: 'Housekeeper' }
]

const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' }
]

const toggleRole = (roleValue: string) => {
  const currentRoles = [...(values.roles || [])] as string[]
  const index = currentRoles.indexOf(roleValue)
  if (index > -1) {
    currentRoles.splice(index, 1)
  } else {
    currentRoles.push(roleValue)
  }
  setFieldValue('roles', currentRoles as any)
}

const isRoleSelected = (roleValue: string) => {
  const roles = values.roles as string[] | undefined
  return (roles || []).includes(roleValue)
}

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <!-- First Name -->
    <BaseInput
      v-model="firstName"
      label="First Name"
      type="text"
      required
      :error="errors.first_name"
      placeholder="Enter first name"
    />

    <!-- Last Name -->
    <BaseInput
      v-model="lastName"
      label="Last Name"
      type="text"
      required
      :error="errors.last_name"
      placeholder="Enter last name"
    />

    <!-- Email -->
    <BaseInput
      v-model="email"
      label="Email"
      type="email"
      required
      :error="errors.email"
      placeholder="staff@example.com"
    />

    <!-- Phone -->
    <BaseInput
      v-model="phone"
      label="Phone"
      type="tel"
      :error="errors.phone"
      placeholder="+1234567890"
    />

    <!-- Preferred Language -->
    <BaseSelect
      v-model="preferredLanguage"
      label="Preferred Language"
      :options="languageOptions"
      required
      :error="errors.preferred_language"
    />

    <!-- Roles (Checkboxes) -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Roles <span class="text-red-500">*</span>
      </label>
      <div class="space-y-2">
        <div v-for="option in roleOptions" :key="option.value" class="flex items-center">
          <input
            :id="`role-${option.value}`"
            type="checkbox"
            :checked="isRoleSelected(option.value)"
            @change="toggleRole(option.value)"
            class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          />
          <label :for="`role-${option.value}`" class="ml-2 text-sm text-gray-700">
            {{ option.label }}
          </label>
        </div>
      </div>
      <p v-if="errors.roles" class="mt-1 text-sm text-red-600">{{ errors.roles }}</p>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 pt-4">
      <BaseButton type="submit" :loading="loading">
        {{ isEditMode ? 'Update Staff' : 'Create Staff' }}
      </BaseButton>
      <BaseButton type="button" variant="secondary" @click="emit('cancel')">
        Cancel
      </BaseButton>
    </div>
  </form>
</template>
