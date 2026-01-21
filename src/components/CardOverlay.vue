<script setup lang="ts">
import Cart from '@/components/Cart.vue'
import CartEmpty from '@/components/CartEmpty.vue'
import { Button } from '@/components/ui/button'
import { format } from '@/lib/number'
import { useCartStore } from '@/stores/cart'
import { useCartOverlayStore } from '@/stores/cartOverlayStore'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const cartStore = useCartStore()
const cartOverlayStore = useCartOverlayStore()
</script>

<template>
  <TransitionRoot as="template" :show="cartOverlayStore.visible">
    <Dialog class="relative z-10" @close="cartOverlayStore.close">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900"
                        >Shopping cart</DialogTitle
                      >
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          @click="cartOverlayStore.close"
                        >
                          <span class="absolute -inset-0.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="size-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div class="mt-8" v-if="!cartStore.isEmpty">
                      <div class="flow-root">
                        <Cart />
                      </div>
                    </div>
                    <div v-else class="flex h-full flex-col items-center justify-center">
                      <CartEmpty />
                      <Button size="lg" class="mt-3" @click="cartOverlayStore.close">
                        Let's shop
                      </Button>
                    </div>
                  </div>

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{{ format(cartStore.subtotal) }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div class="mt-6">
                      <RouterLink
                        to="/checkout"
                        class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >Checkout</RouterLink
                      >
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{{ ' ' }}
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                          @click="cartOverlayStore.close"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
