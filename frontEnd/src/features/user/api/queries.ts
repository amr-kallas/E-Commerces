import { createQueryKeys } from '@lukemorales/query-key-factory'
import API from './api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const keys = createQueryKeys('store', {
  users: {
    queryFn: API.getAllUsers,
    queryKey: [''],
  },
  user:(id:string)=>({
    queryFn:()=>API.getUser(id),
    queryKey:[id]
  }),
  me: {
    queryFn: API.getMe,
    queryKey: [''],
  },
  logout: {
    queryFn: API.logout,
    queryKey: [''],
  },
})
export const queries = {
  useUsers: () => useQuery(keys.users),
  useUser: (id:string) => useQuery(keys.user(id)),
  useMe: () => useQuery(keys.me),
  useEdit:()=>useMutation(API.edit),
  useDelete:()=>useMutation(API.delete),
  useLogout: () => useMutation(API.logout),
}
