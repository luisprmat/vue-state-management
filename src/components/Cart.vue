<script setup lang="ts">
import CartRow from '@/components/CartRow.vue'
import { cartKey, voidCart } from '@/provides'
import type { CartContext } from '@/types'
import { inject } from 'vue'

const { cart, incrementProduct, decrementProduct, removeProduct } =
  inject<CartContext>(cartKey) || voidCart
</script>

<template>
  <ul role="list" class="-my-6 divide-y divide-gray-200">
    <CartRow
      @remove="removeProduct(orderLine)"
      @increment="incrementProduct(orderLine)"
      @decrement="decrementProduct(orderLine)"
      v-for="orderLine in cart"
      :order-line="orderLine"
      :key="orderLine.id"
    />
  </ul>
</template>
