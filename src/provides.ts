import { ref, type InjectionKey } from 'vue'
import type { CartContext } from './types'

export const cartKey = Symbol() as InjectionKey<CartContext>

export const voidCart = {
  cart: ref([]),
  incrementProduct: () => {},
  decrementProduct: () => {},
  removeProduct: () => {},
}
