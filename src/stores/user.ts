import type {
  LoginCredentials,
  RegisterCredentials,
  RegistrationResponseSuccessfully,
  ResourceWrapper,
  User,
} from '@/types'
import { defaults, mande } from 'mande'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const auth = mande('http://state-management-api.test/api/auth')
const authUser = mande('http://state-management-api.test/api/user')

export const useUserStore = defineStore('user', () => {
  const authToken = ref<string | null>(null)
  const user = ref<User | null>(null)
  const didInit = ref<boolean>(false)

  const init = async () => {
    let localStoragetoken: string | null = localStorage.getItem('token')
    let token: string | null = null
    if (localStoragetoken) {
      token = JSON.parse(localStoragetoken) ?? null
    }
    if (token) {
      await setToken(token)
    }
    didInit.value = true
  }

  const setToken = async (token: string | null) => {
    authToken.value = token
    localStorage.setItem('token', JSON.stringify(token))
    if (token) {
      defaults.headers.Authorization = `Bearer ${token}`
      try {
        await fetchUser()
      } catch (e) {
        setToken(null)
      }
    } else {
      delete defaults.headers.Authorization
    }
  }
  const fetchUser = async () => {
    const response = await authUser.get<ResourceWrapper<User>>()
    user.value = response.data
  }
  const register = async ({
    name,
    email,
    password,
    password_confirmation,
  }: RegisterCredentials) => {
    try {
      const registrationResponse = await auth.post<RegistrationResponseSuccessfully>('/register', {
        name,
        email,
        password,
        password_confirmation,
      })

      setToken(registrationResponse.token)
      fetchUser()
      return {
        success: true,
      }
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'body' in e) {
        return {
          success: false,
          body: e.body,
        }
      }

      return {
        success: false,
        body: 'An unexpected error occurred',
      }
    }
  }

  const login = async ({ email, password }: LoginCredentials) => {
    try {
      const loginResponse = await auth.post<RegistrationResponseSuccessfully>('/token', {
        email,
        password,
      })

      setToken(loginResponse.token)
      fetchUser()
      return {
        success: true,
      }
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'body' in e) {
        return {
          success: false,
          body: e.body,
        }
      }

      return {
        success: false,
        body: 'An unexpected error occurred',
      }
    }
  }

  const logout = () => {
    user.value = null
    setToken(null)
  }

  return {
    authToken,
    didInit,
    user,
    init,
    login,
    register,
    logout,
  }
})
