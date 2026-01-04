<script setup lang="ts">
import type { Cart, Product } from '@/types'
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const props = defineProps<{
  cart: Cart<Product>[]
}>()

const amount = computed(() => props.cart.reduce((total, value) => total + value.quantity, 0))

const emit = defineEmits(['cart-clicked'])
</script>

<template>
  <nav class="bg-white shadow">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="ml-auto flex items-center">
          <div class="md:ml-4 md:flex md:shrink-0 md:items-center">
            <button
              type="button"
              class="relative flex bg-white p-1 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              @click="emit('cart-clicked')"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View cart</span>
              <ShoppingCartIcon class="size-6" aria-hidden="true" />
              <span
                v-if="cart.length > 0"
                class="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white"
                >{{ amount }}</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
