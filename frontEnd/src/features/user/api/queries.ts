import { createQueryKeys } from '@lukemorales/query-key-factory'
import API from './api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Paginate } from '../../../utils/type'

export const keys = createQueryKeys('store', {
  users: ({ limit, page }: Paginate) => ({
    queryFn: () => API.getAllUsers({ limit, page }),
    queryKey: [limit, page],
  }),
  user: (id: string) => ({
    queryFn: () => API.getUser(id),
    queryKey: [id],
  }),
  me: {
    queryFn: API.getMe,
    queryKey: [''],
  },
  search: (title: string) => ({
    queryFn: () => API.search(title),
    queryKey: ['search',title],
  }),
  logout: {
    queryFn: API.logout,
    queryKey: [''],
  },
})
export const queries = {
  useUsers: ({ limit, page }: Paginate) =>
    useQuery(keys.users({ limit, page })),
  useUser: (id: string) => useQuery({ ...keys.user(id), enabled: !!id }),
  useSearch: (title: string) => useQuery({...keys.search(title),enabled:!!title}),
  useMe: () => useQuery(keys.me),
  useEdit: () => useMutation(API.edit),
  useDelete: () => useMutation(API.delete),
  useAdd: () => useMutation(API.add),
  useLogout: () => useMutation(API.logout),
}
