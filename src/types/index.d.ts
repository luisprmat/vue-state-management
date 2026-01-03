export interface Product {
  id: number
  title: string
  description: string
  price: number
}

export interface Cart<T extends object> extends T {
  quantity: number
}
