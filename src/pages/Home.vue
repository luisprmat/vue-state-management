<script setup lang="ts">
import CardOverlay from '@/components/CardOverlay.vue'
import NavBar from '@/components/NavBar.vue'
import ProductGrid from '@/components/ProductGrid.vue'
import { useProductsStore } from '@/stores/products'
import { ref } from 'vue'

const cardOverlayOpen = ref(false)

const productsStore = useProductsStore()
</script>

<template>
  <div>
    <NavBar @cart-clicked="cardOverlayOpen = true" />
    <CardOverlay :open="cardOverlayOpen" @close="cardOverlayOpen = false" />
    <div class="mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
      <ProductGrid :products="productsStore.products" :loading="productsStore.loading" />
    </div>
  </div>
</template>
