<script setup lang="ts">
import CartRow from '@/components/CartRow.vue'
import type { Cart, Product } from '@/types'

defineProps<{
  cart: Cart<Product>[]
}>()

const emit = defineEmits<{
  (e: 'remove', orderLine: Cart<Product>): void
  (e: 'increment', orderLine: Cart<Product>): void
  (e: 'decrement', orderLine: Cart<Product>): void
}>()
</script>

<template>
  <ul role="list" class="-my-6 divide-y divide-gray-200">
    <CartRow
      @remove="emit('remove', orderLine)"
      @increment="emit('increment', orderLine)"
      @decrement="emit('decrement', orderLine)"
      v-for="orderLine in cart"
      :order-line="orderLine"
      :key="orderLine.id"
    />
  </ul>
</template>
