import { PaginateResponse } from '@utils/type'

export type User = {
  email: string
  name: string
  role: string
  created_at: string
  id: string
  updated_at: string
}
export type GetUser = {
  id: string
} & User
export type EditForm = {
  body: User
  id: string
}
export type AllUser<T> = {
  data: T[]
} & PaginateResponse
export type GetMe = GetUser
export type AddUser = {
  password: string
} & User
