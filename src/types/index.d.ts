import type { Ref } from 'vue'

export interface Product {
  id: number
  title: string
  description: string
  price: number
}

export interface Cart<T extends object> extends T {
  quantity: number
}

export interface CartContext {
  cart: Ref<Cart<Product>[]>
  incrementProduct: (product: Product) => void
  decrementProduct: (product: Product) => void
  removeProduct: (product: Cart<Product>) => void
}
