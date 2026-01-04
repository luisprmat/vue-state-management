<script setup lang="ts">
import CartRow from '@/components/CartRow.vue'
import { cartKey } from '@/provides'
import type { Cart, Product } from '@/types'
import { inject, ref, type Ref } from 'vue'

const { cart, incrementProduct, decrementProduct, removeProduct } = inject<{
  cart: Ref<Cart<Product>[]>
  incrementProduct: (product: Product) => void
  decrementProduct: (product: Product) => void
  removeProduct: (product: Cart<Product>) => void
}>(cartKey) || {
  cart: ref([]),
  incrementProduct: () => {},
  decrementProduct: () => {},
  removeProduct: () => {},
}
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
