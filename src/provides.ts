import type { InjectionKey, Ref } from 'vue'
import type { Cart, Product } from './types'

export const cartKey = Symbol() as InjectionKey<{
  cart: Ref<Cart<Product>[]>
  removeProduct: (product: Cart<Product>) => void
  incrementProduct: (product: Product) => void
  decrementProduct: (product: Product) => void
}>
