import { createQueryKeys } from '@lukemorales/query-key-factory'
import API from './api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const keys = createQueryKeys('store', {
  users: {
    queryFn: API.getAllUsers,
    queryKey: [''],
  },
  user: {
    queryFn: API.getUser,
    queryKey: [''],
  },
  logout: {
    queryFn: API.logout,
    queryKey: [''],
  },
})
export const queries = {
  useUsers: () => useQuery(keys.users),
  useUser: () => useQuery(keys.user),
  useLogout: () => useMutation(API.logout),
}
