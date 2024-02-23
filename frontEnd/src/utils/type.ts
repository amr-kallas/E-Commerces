export type Paginate = {
  limit: number
  page: number
}
export type PaginateResponse = {
  current_page: number
  first_page_url: string
  from: number
  last_page: number
  next_page_url: string
  path: string
  per_page: number
  to: number
  total: number
}
