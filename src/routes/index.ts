import Checkout from '@/pages/Checkout.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Profile from '@/pages/Profile.vue'
import Register from '@/pages/Register.vue'
import Thankyou from '@/pages/Thankyou.vue'
import { useUserStore } from '@/stores/user'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/checkout',
    component: Checkout,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/thankyou/:orderId',
    component: Thankyou,
    name: 'thankyou',
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const userStore = useUserStore()
  if (!userStore.didInit) {
    await userStore.init()
  }

  if (to.meta.requiresAuth && !userStore.user) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath,
      },
    }
  }
})

export default router
