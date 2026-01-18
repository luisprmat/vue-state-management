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
import type { LoginCredentials } from '@/types'
import { AlertCircle } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const message = ref('')
const errors = ref<Partial<Record<keyof LoginCredentials, string[]>>>({})

const hasError = <Key extends keyof LoginCredentials>(field: Key) => {
  return errors.value.hasOwnProperty(field)
}

const getError = <Key extends keyof LoginCredentials>(field: Key) => {
  return errors.value[field]?.join(', ') || ''
}
const credentials = ref<LoginCredentials>({
  email: '',
  password: '',
})

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const handleLogin = async () => {
  const loginResponse = await userStore.login(credentials.value)
  if (loginResponse.success) {
    const redirectPath = Array.isArray(route.query.redirect)
      ? route.query.redirect[0]
      : route.query.redirect
    router.push(redirectPath ?? '/')
  } else {
    const body = loginResponse.body as {
      message: string
      errors: Partial<Record<keyof LoginCredentials, string[]>>
    }
    message.value = body.message
    errors.value = Object.assign({}, body.errors)
  }
}
</script>

<template>
  <form
    @submit.stop.prevent="handleLogin"
    class="flex h-screen w-full items-center justify-center px-4"
  >
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account.</CardDescription>
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
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="info@example.com"
            v-model="credentials.email"
            autofocus
          />
          <small class="text-red-500" v-if="hasError('email')">{{ getError('email') }}</small>
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" type="password" v-model="credentials.password" />
          <small class="text-red-500" v-if="hasError('password')">{{ getError('password') }}</small>
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full">Login</Button>
      </CardFooter>
    </Card>
  </form>
</template>
