<script setup lang="ts">
import type { Product } from '@/types'
import { ArrowPathIcon } from '@heroicons/vue/16/solid'
import ProductCard from './ProductCard.vue'

const props = defineProps<{
  products: Product[]
  loading: boolean
}>()
</script>
<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" v-if="!loading">
    <ProductCard :key="product.id" v-for="product in products" :product="product" />
  </div>
  <div v-else class="flex items-center justify-center py-6">
    <ArrowPathIcon class="size-6 animate-spin" />
  </div>
</template>
