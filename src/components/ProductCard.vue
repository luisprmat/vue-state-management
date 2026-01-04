<script setup lang="ts">
import Stepper from '@/components/Stepper.vue'
import { format } from '@/lib/number'
import { cartKey, voidCart } from '@/provides'
import type { CartContext, Product } from '@/types'
import { computed, inject } from 'vue'

const { cart, incrementProduct, decrementProduct } = inject<CartContext>(cartKey) || voidCart

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'increment', product: Product): void
  (e: 'decrement', product: Product): void
}>()

const amount = computed(() => {
  const foundValue = cart.value.find((value) => value.id === props.product.id)
  return foundValue ? foundValue.quantity : 0
})
</script>

<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200"
    :class="[amount > 0 ? 'bg-amber-100' : 'bg-white']"
  >
    <div class="flex flex-1 flex-col space-y-2 p-4">
      <h3 class="text-sm font-medium text-gray-900">
        {{ product.title }}
      </h3>
      <p class="text-sm text-gray-500">
        {{ product.description }}
      </p>
      <div class="flex flex-1 flex-col justify-end">
        <p class="text-base font-medium text-gray-900">
          {{ format(product.price) }}
        </p>
      </div>
      <Stepper
        :amount="amount"
        @increment="incrementProduct(product)"
        @decrement="decrementProduct(product)"
      />
    </div>
  </div>
</template>
