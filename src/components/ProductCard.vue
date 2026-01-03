<script setup lang="ts">
import { format } from '@/lib/number'
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()
</script>

<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
  >
    <div class="flex flex-1 flex-col space-y-2 p-4">
      <h3 class="text-sm font-medium text-gray-900">
        {{ product.title }}
      </h3>
      <p class="text-sm text-gray-500">
        {{ product.description }}
      </p>
      <div class="flex flex-1 flex-col justify-end">
        <p class="text-base font-medium text-gray-900">
          {{ format(product.price) }}
        </p>
      </div>
    </div>
  </div>
</template>
