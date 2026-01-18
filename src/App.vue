<script setup lang="ts">
import CardOverlay from '@/components/CardOverlay.vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
productsStore.fetchProducts()
</script>
<template>
  <RouterView />
  <CardOverlay />
</template>
