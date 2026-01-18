import type { Cart, CollectionWrapper, Order, Product, ResourceWrapper } from '@/types'
import { mande } from 'mande'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const ordersApi = mande('http://state-management-api.test/api/orders')

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])

  const fetchOrders = async () => {
    const response = await ordersApi.get<CollectionWrapper<Order>>()
    orders.value = response.data
  }

  const confirmOrder = (cart: Cart<Product>[]) =>
    ordersApi.post<ResourceWrapper<Order>>({
      cart: cart.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    })

  return {
    orders,
    confirmOrder,
    fetchOrders,
  }
})
