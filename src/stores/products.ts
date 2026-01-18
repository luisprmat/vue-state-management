import { useCartStore } from '@/stores/cart'
import type { CollectionWrapper, Product } from '@/types'
import { mande } from 'mande'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const productsApi = mande('http://state-management-api.test/api/products')

export const useProductsStore = defineStore('products', () => {
  // state
  const products = ref<Product[]>([])
  const loading = ref(false)
  const didLoad = ref(false)

  // getters
  const upsellingProducts = computed(() => {
    const cartStore = useCartStore()
    return products.value
      .filter((product) => product.use_for_upselling)
      .filter((product) => cartStore.amountForProduct(product) === 0)
  })

  // actions
  const fetchProducts = async (force = false) => {
    if (didLoad.value && !force) return

    loading.value = true
    let data: Product[] = []

    try {
      const response = await productsApi.get<CollectionWrapper<Product>>()
      data = response.data
    } catch (error) {
      console.error(error)
    } finally {
      products.value = data
      loading.value = false
      didLoad.value = true
    }
  }

  return {
    products,
    loading,
    didLoad,
    fetchProducts,
    upsellingProducts,
  }
})
