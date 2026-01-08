<script setup lang="ts">
import CartRow from '@/components/CartRow.vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <ul role="list" class="-my-6 divide-y divide-gray-200">
    <CartRow
      @remove="cartStore.removeProduct(orderLine)"
      @increment="cartStore.incrementProduct(orderLine)"
      @decrement="cartStore.decrementProduct(orderLine)"
      v-for="orderLine in cartStore.cart"
      :order-line="orderLine"
      :key="orderLine.id"
    />
  </ul>
</template>
