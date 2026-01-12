<script setup lang="ts">
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
productsStore.fetchProducts()
</script>
<template>
  <RouterView />
</template>
