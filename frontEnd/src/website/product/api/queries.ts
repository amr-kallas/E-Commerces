import { createQueryKeys } from '@lukemorales/query-key-factory'
import API from './api'
import { useQuery } from '@tanstack/react-query'

export const keys = createQueryKeys('webSiteProduct', {
  latestSale: {
    queryFn: API.latestSale,
    queryKey: [''],
  },
})
export const queries = {
  useLatestSale: () => useQuery(keys.latestSale),
}
