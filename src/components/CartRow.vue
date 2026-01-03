<script setup lang="ts">
import { format } from '@/lib/number'
import type { Cart, Product } from '@/types'
import { MinusCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
const props = defineProps<{
  orderLine: Cart<Product>
}>()

const emit = defineEmits<{
  (e: 'increment'): void
  (e: 'decrement'): void
  (e: 'remove'): void
}>()

const subtotal = computed(() => format(props.orderLine.price * props.orderLine.quantity))
</script>

<template>
  <li class="flex py-6">
    <div class="ml-4 flex flex-1 flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>{{ orderLine.title }}</h3>
          <p class="ml-4">{{ subtotal }}</p>
        </div>
      </div>
      <div class="flex flex-1 items-end justify-between text-sm">
        <div class="flex space-x-2">
          <button
            type="button"
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            @click="emit('decrement')"
          >
            <MinusCircleIcon class="size-5" />
          </button>
          <p class="w-5 text-center text-gray-500">{{ orderLine.quantity }}</p>
          <button
            type="button"
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            @click="emit('increment')"
          >
            <PlusCircleIcon class="size-5" />
          </button>
        </div>

        <div class="flex">
          <button
            type="button"
            class="font-medium text-red-600 hover:text-red-500"
            @click="emit('remove')"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </li>
</template>
