import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartOverlayStore = defineStore('cart-overlay', () => {
  const visible = ref<boolean>(false)

  const toggle = () => {
    visible.value = !visible.value
  }

  const open = () => {
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  return {
    visible,
    open,
    close,
    toggle,
  }
})
