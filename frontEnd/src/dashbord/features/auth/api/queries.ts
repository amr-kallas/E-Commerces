import { useMutation, useQuery } from '@tanstack/react-query'
import API from './api'
import { createQueryKeys } from '@lukemorales/query-key-factory'
export const keys = createQueryKeys('auth', {
  google: {
    queryFn: API.google,
    queryKey: [''],
  },
})
export const queries = {
  useSignup: () => useMutation(API.signup),
  useLogin: () => useMutation(API.login),
  useGoogle: () => useQuery(keys.google),
}
