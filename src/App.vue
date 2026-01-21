<script setup lang="ts">
import CardOverlay from '@/components/CardOverlay.vue'
import { Toaster } from '@/components/ui/sonner'
import { useProductsStore } from '@/stores/products'
import { onBeforeUnmount } from 'vue'
import { toast } from 'vue-sonner'
import { useCartStore } from './stores/cart'

import 'vue-sonner/style.css'

const cartStore = useCartStore()
const unsubscribe = cartStore.$onAction(({ name, store, args }) => {
  if (name === 'incrementProduct') {
    toast.success(`${args[0].title} added to cart.`)
  } else if (name === 'removeProduct') {
    toast.error(`${args[0].title} removed from cart.`, {
      action: {
        label: 'Undo',
        onClick: () => {
          cartStore.restoreLine(args[0])
        },
      },
    })
  }
})

onBeforeUnmount(unsubscribe)

const productsStore = useProductsStore()
productsStore.fetchProducts()
</script>

<template>
  <Teleport to="#notification-root">
    <Toaster position="top-center" rich-colors />
  </Teleport>
  <RouterView />
  <CardOverlay />
</template>
