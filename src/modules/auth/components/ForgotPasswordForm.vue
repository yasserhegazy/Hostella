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
  submit: [data: { email: string }]
}>()

const email = defineModel<string>('email', { default: '' })

function getFieldError(field: string): string | undefined {
  const errors = props.validationErrors[field]
  return errors?.length ? errors[0] : undefined
}

function handleSubmit() {
  emit('submit', { email: email.value })
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

    <BaseButton type="submit" full-width size="lg" :loading="loading" :disabled="loading">
      Send Reset Link
    </BaseButton>
  </form>
</template>
