export interface Product {
  id: number
  title: string
  description: string
  price: number
  use_for_upselling: boolean
}

export interface User {
  id: number
  name: string
  email: string
}

export type CollectionWrapper<T> = {
  data: T[]
}

export type ResourceWrapper<T> = {
  data: T
}

export interface Cart<T extends object> extends T {
  quantity: number
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export type ValidationErrors<T> = {
  [K in keyof T]?: string[]
}

export interface ErrorsResponse<T> {
  message: string
  errors: ValidationErrors<T>
}

export interface User {
  id: number
  name: string
  email: string
}

export type RegistrationResponseSuccessfully = {
  token: string | null
}

export type RegistrationResponseFailed = ErrorsResponse<RegisterCredentials>
