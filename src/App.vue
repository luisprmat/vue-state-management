<script setup lang="ts">
import CardOverlay from '@/components/CardOverlay.vue'
import NavBar from '@/components/NavBar.vue'
import ProductCard from '@/components/ProductCard.vue'
import { ref } from 'vue'
import type { Product } from './types'

const cardOverlayOpen = ref(false)

const products: Product[] = [
  {
    id: 1,
    title: 'Pizza',
    description: 'A tasty pizza with tomato sauce, mozzarella cheese, and fresh basil.',
    price: 8.95,
  },
  {
    id: 2,
    title: 'Pasta',
    description: 'A traditional pasta with tomato sauce, mozzarella cheese, and fresh basil.',
    price: 14.95,
  },
  {
    id: 3,
    title: 'Burger',
    description: 'A delicious burger with cheddar cheese, lettuce, tomato, and pickles.',
    price: 12.95,
  },
  {
    id: 4,
    title: 'French fries',
    description: 'Golden brown fries with ketchup.',
    price: 4.95,
  },
  {
    id: 5,
    title: 'Caesar Salad',
    description: 'A classic Caesar salad with romaine lettuce, croutons, and parmesan cheese.',
    price: 9.95,
  },
  {
    id: 6,
    title: 'Sandwich',
    description: 'A fresh sandwich with turkey, lettuce, tomato, and mayo.',
    price: 12.95,
  },
]
</script>

<template>
  <div>
    <NavBar @cart-clicked="cardOverlayOpen = true" />
    <CardOverlay :open="cardOverlayOpen" @close="cardOverlayOpen = false" />
    <div class="mx-auto mt-4 max-w-7xl sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductCard :key="product.id" v-for="product in products" :product="product" />
      </div>
    </div>
  </div>
</template>
