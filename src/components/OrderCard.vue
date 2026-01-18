<script setup lang="ts">
import { format } from '@/lib/number'
import type { Order } from '@/types'

const props = defineProps<{
  order: Order
}>()
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white shadow">
    <div class="flex border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <h3 class="mr-auto text-base text-gray-400">Order #{{ order.id }}</h3>
      <h3 class="text-base font-semibold text-gray-900">Total: {{ format(order.total_price) }}</h3>
    </div>
    <div class="px-4 py-5 sm:p-6">
      <ul>
        <li class="grid grid-cols-2" v-for="item in order.order_lines">
          <span
            >{{ item.quantity }} &times; {{ item.title }} ({{ format(item.price_per_unit) }})</span
          >
          <span class="text-right font-bold">{{ format(item.total_price) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
