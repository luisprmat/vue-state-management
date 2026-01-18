<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { Button } from '@/components/ui/button'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const logout = async () => {
  router.push('/')
  userStore.logout()
}
</script>

<template>
  <NavBar />
  <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold">Profile</h1>
    <p class="mt-2 text-sm text-gray-500">Welcome, {{ userStore.user?.name }}!</p>
    <div class="mt-3">
      <Button @click="logout">Logout</Button>
    </div>
  </div>
</template>
