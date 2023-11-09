import { useMutation, useQuery } from '@tanstack/react-query'
import API from './api'
import { createQueryKeys } from '@lukemorales/query-key-factory'
export const keys = createQueryKeys('category', {
  getAll: {
    queryFn: API.getAll,
    queryKey: [''],
  },
  get: (id: string) => ({
    queryFn: () => API.get(id),
    queryKey: [id],
  }),
})
export const queries = {
  useAll: () => useQuery(keys.getAll),
  useCategory: (id: string) => useQuery({...keys.get(id),enabled:!!id}),
  useAdd: () => useMutation(API.add),
  useEdit: () => useMutation(API.edit),
  useDelete: () => useMutation(API.delete),
}
