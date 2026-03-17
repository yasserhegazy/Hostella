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
  submit: [credentials: { email: string; password: string }]
}>()

const email = defineModel<string>('email', { default: '' })
const password = defineModel<string>('password', { default: '' })

function getFieldError(field: string): string | undefined {
  const errors = props.validationErrors[field]
  return errors?.length ? errors[0] : undefined
}

function handleSubmit() {
  emit('submit', { email: email.value, password: password.value })
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

    <div>
      <BaseInput
        v-model="password"
        type="password"
        label="Password"
        placeholder="••••••••"
        required
        :error="getFieldError('password')"
      />
      <div class="mt-1.5 text-right">
        <router-link
          to="/forgot-password"
          class="text-sm text-primary hover:text-primary-dark transition-colors"
        >
          Forgot password?
        </router-link>
      </div>
    </div>

    <BaseButton type="submit" full-width size="lg" :loading="loading" :disabled="loading">
      Sign In
    </BaseButton>
  </form>
</template>
