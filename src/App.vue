<script setup lang="ts">
import { provide, ref } from 'vue'
import { cartKey } from './provides'
import type { Cart, Product } from './types'

const cart = ref<Cart<Product>[]>([])

const removeProduct = (product: Cart<Product>) => {
  cart.value = cart.value.filter((value) => value.id !== product.id)
}

const incrementProduct = (product: Product) => {
  const foundValue = cart.value.find((value) => value.id === product.id)
  if (foundValue) {
    foundValue.quantity++
  } else {
    cart.value.push({
      ...product,
      quantity: 1,
    })
  }
}

const decrementProduct = (product: Product) => {
  const foundValue = cart.value.find((value) => value.id === product.id)
  if (foundValue) {
    foundValue.quantity--
    if (foundValue.quantity <= 0) {
      cart.value = cart.value.filter((value) => value.id !== product.id)
    }
  }
}

provide(cartKey, {
  cart,
  removeProduct,
  incrementProduct,
  decrementProduct,
})
</script>

<template>
  <RouterView />
</template>
