<script setup lang="ts">
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'

interface Props {
  loading?: boolean
  validationErrors?: Record<string, string[]>
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  validationErrors: () => ({})
})

const emit = defineEmits<{
  submit: [data: { email: string; password: string; password_confirmation: string }]
}>()

const email = defineModel<string>('email', { default: '' })
const password = defineModel<string>('password', { default: '' })
const passwordConfirmation = defineModel<string>('passwordConfirmation', { default: '' })

function getFieldError(field: string): string | undefined {
  const errors = props.validationErrors[field]
  return errors?.length ? errors[0] : undefined
}

function handleSubmit() {
  emit('submit', {
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <BaseInput
      v-model="email"
      type="email"
      label="Email Address"
      placeholder="you@example.com"
      required
      :error="getFieldError('email')"
    />

    <BaseInput
      v-model="password"
      type="password"
      label="New Password"
      placeholder="••••••••"
      required
      :error="getFieldError('password')"
      hint="Minimum 8 characters"
    />

    <BaseInput
      v-model="passwordConfirmation"
      type="password"
      label="Confirm Password"
      placeholder="••••••••"
      required
      :error="getFieldError('password_confirmation')"
    />

    <BaseButton type="submit" full-width size="lg" :loading="loading" :disabled="loading">
      Reset Password
    </BaseButton>
  </form>
</template>
