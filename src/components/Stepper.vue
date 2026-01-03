<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

defineProps<{
  amount: number
}>()

const emit = defineEmits(['increment', 'decrement'])
</script>

<template>
  <div class="flex items-center justify-center space-x-2">
    <Button @click="emit('decrement')">
      <MinusIcon />
    </Button>
    <span class="text-sm font-medium text-gray-900">
      {{ amount }}
    </span>
    <Button @click="emit('increment')">
      <PlusIcon />
    </Button>
  </div>
</template>
