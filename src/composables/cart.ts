import type { Cart, Product } from '@/types'
import { computed, ref, watch } from 'vue'

const cart = ref<Cart<Product>[]>([])

watch(
  () => cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

const savedCart = localStorage.getItem('cart')
if (savedCart) {
  cart.value = JSON.parse(savedCart)
}

const removeProduct = (product: Cart<Product>) => {
  cart.value = cart.value.filter((value) => value.id !== product.id)
}

const clearCart = () => {
  cart.value = []
}

const incrementProduct = (product: Product) => {
  const foundValue = cart.value.find((value) => value.id === product.id)
  if (foundValue) {
    foundValue.quantity++
  } else {
    cart.value.push({
      ...product,
      quantity: 1,
    })
  }
}

const decrementProduct = (product: Product) => {
  const foundValue = cart.value.find((value) => value.id === product.id)
  if (foundValue) {
    foundValue.quantity--
    if (foundValue.quantity <= 0) {
      cart.value = cart.value.filter((value) => value.id !== product.id)
    }
  }
}

const subtotal = computed<number>(() =>
  cart.value.reduce((total, product) => total + product.price * product.quantity, 0),
)

const taxes = computed(() => Math.round(subtotal.value * 0.1 * 100) / 100)

const total = computed(() => Math.round((subtotal.value + taxes.value) * 100) / 100)

export function useCart() {
  return {
    cart,
    subtotal,
    taxes,
    total,
    clearCart,
    removeProduct,
    incrementProduct,
    decrementProduct,
  }
}
