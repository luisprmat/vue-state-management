<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserStore } from '@/stores/user'
import type { RegisterCredentials } from '@/types'
import { AlertCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const message = ref('')
const errors = ref<Partial<Record<keyof RegisterCredentials, string[]>>>({})

const hasError = <Key extends keyof RegisterCredentials>(field: Key) => {
  return errors.value.hasOwnProperty(field)
}

const getError = <Key extends keyof RegisterCredentials>(field: Key) => {
  return errors.value[field]?.join(', ') || ''
}
const credentials = ref<RegisterCredentials>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const router = useRouter()
const userStore = useUserStore()

const handleRegister = async () => {
  const registrationResponse = await userStore.register(credentials.value)
  if (registrationResponse.success) {
    router.push('/')
  } else {
    const body = registrationResponse.body as {
      message: string
      errors: Partial<Record<keyof RegisterCredentials, string[]>>
    }
    message.value = body.message
    errors.value = Object.assign({}, body.errors)
  }
}
</script>

<template>
  <form
    @submit.stop.prevent="handleRegister"
    class="flex h-screen w-full items-center justify-center px-4"
  >
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Register</CardTitle>
        <CardDescription>Enter your details to create an account.</CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <Alert variant="destructive" v-if="message">
          <AlertCircle class="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {{ message }}
          </AlertDescription>
        </Alert>
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input
            v-model="credentials.name"
            id="name"
            type="text"
            placeholder="Dr. Parrado"
            autofocus
          />
          <small class="text-red-500" v-if="hasError('name')">{{ getError('name') }}</small>
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            v-model="credentials.email"
            id="email"
            type="email"
            placeholder="info@example.com"
          />
          <small class="text-red-500" v-if="hasError('email')">{{ getError('email') }}</small>
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input v-model="credentials.password" id="password" type="password" />
          <small class="text-red-500" v-if="hasError('password')">{{ getError('password') }}</small>
        </div>
        <div class="grid gap-2">
          <Label for="password_confirmation">Confirm Password</Label>
          <Input
            v-model="credentials.password_confirmation"
            id="password_confirmation"
            type="password"
          />
          <small class="text-red-500" v-if="hasError('password_confirmation')">{{
            getError('password_confirmation')
          }}</small>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Register</Button>
      </CardFooter>
    </Card>
  </form>
</template>
