import { createQueryKeys } from '@lukemorales/query-key-factory'
import API from './api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Paginate } from '@utils/type'

export const keys = createQueryKeys('product', {
  getAll: ({ limit, page }: Paginate) => ({
    queryFn: () => API.getAll({ limit, page }),
    queryKey: [limit, page],
  }),
  getAllCategories:{
    queryFn: API.getAllCategories,
    queryKey: [''],
  },
  get: (id: string) => ({
    queryFn: () => API.get(id),
    queryKey: [''],
  }),
  search: (title: string) => ({
    queryFn: () => API.search(title),
    queryKey: ['search', title],
  }),
})

export const queries = {
  useAll: ({ limit, page }: Paginate) => useQuery(keys.getAll({ limit, page })),
  useAllCategories: () => useQuery(keys.getAllCategories),
  useProduct: (id: string) => useQuery({ ...keys.get(id), enabled: !!id }),
  useAdd: () => useMutation(API.Add),
  useAddImg: () => useMutation(API.AddImg),
  useSearch: (title: string) =>
    useQuery({ ...keys.search(title), enabled: !!title }),
  useEdit: () => useMutation(API.Edit),
  useDelete: () => useMutation(API.Delete),
  useDeleteImg: () => useMutation(API.DeleteImg),
}
