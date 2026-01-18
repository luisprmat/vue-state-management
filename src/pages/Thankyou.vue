<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.orderId
</script>

<template>
  <div>
    <div class="py-24 text-center">
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">Thanks!</h1>
      <p class="mx-auto mt-4 mb-3 max-w-3xl text-base text-gray-500">
        Thanks for shopping with us! Your order ID is <strong>{{ id }}</strong
        >.
      </p>
      <RouterLink
        to="/"
        class="rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
      >
        Go back home
      </RouterLink>
    </div>
  </div>
</template>
