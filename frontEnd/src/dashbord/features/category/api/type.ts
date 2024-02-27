import { PaginateResponse } from '../../../../utils/type'

export type categoryBody = {
  id: string
  title: string
  image: string
  created_at: string
  updated_at: string
}
export type AllCategories<T> = {
  data: T[]
} & PaginateResponse
export type Edit = {
  id: string
  body: FormData
}
