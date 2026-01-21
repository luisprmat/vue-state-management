import type { Cart, Product } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useOrdersStore } from './orders'

export const useCartStore = defineStore('cart', () => {
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

  const restoreLine = (line: Cart<Product>) => {
    cart.value.push(line)
  }

  const clearCart = () => {
    cart.value = []
  }

  const convert = async () => {
    const returnValue = await useOrdersStore().confirmOrder(cart.value)
    clearCart()
    return returnValue
  }

  const incrementProduct = (product: Product, amount = 1) => {
    const foundValue = cart.value.find((value) => value.id === product.id)
    if (foundValue) {
      foundValue.quantity += amount
    } else {
      cart.value.push({
        ...product,
        quantity: amount,
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

  const subtotal = computed<number>(() => {
    const subtotal = cart.value.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    )
    return Math.round((subtotal * 100) / 100)
  })

  const taxes = computed<number>(() => Math.round(subtotal.value * 0.1 * 100) / 100)

  const total = computed<number>(() => Math.round((subtotal.value + taxes.value) * 100) / 100)

  const amountForProduct = (product: Product) => {
    const foundValue = cart.value.find((value) => value.id === product.id)
    return foundValue ? foundValue.quantity : 0
  }

  const isEmpty = computed(() => cart.value.length === 0)

  return {
    cart,
    subtotal,
    taxes,
    total,
    isEmpty,
    restoreLine,
    convert,
    amountForProduct,
    clearCart,
    removeProduct,
    incrementProduct,
    decrementProduct,
  }
})
