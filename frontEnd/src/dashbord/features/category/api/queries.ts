import { useMutation, useQuery } from '@tanstack/react-query'
import API from './api'
import { createQueryKeys } from '@lukemorales/query-key-factory'
import { Paginate } from '@utils/type'
export const keys = createQueryKeys('category', {
  getAll: ({ limit, page }: Paginate) => ({
    queryFn: () => API.getAll({ limit, page }),
    queryKey: [limit, page],
  }),
  get: (id: string) => ({
    queryFn: () => API.get(id),
    queryKey: [id],
  }),
  search: (title: string) => ({
    queryFn: () => API.search(title),
    queryKey: ['search', title],
  }),
})
export const queries = {
  useAll: ({ limit, page }: Paginate) => useQuery(keys.getAll({ limit, page })),
  useCategory: (id: string) => useQuery({ ...keys.get(id), enabled: !!id }),
  useAdd: () => useMutation(API.add),
  useEdit: () => useMutation(API.edit),
  useDelete: () => useMutation(API.delete),
  useSearch: (title: string) =>
    useQuery({ ...keys.search(title), enabled: !!title }),
}
