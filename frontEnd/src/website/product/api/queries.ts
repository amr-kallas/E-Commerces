import { createQueryKeys } from '@lukemorales/query-key-factory'
import API from './api'
import { useQuery } from '@tanstack/react-query'

export const keys = createQueryKeys('webSiteProduct', {
  latestSale: {
    queryFn: API.latestSale,
    queryKey: [''],
  },
  topRated: {
    queryFn: API.topRatedSale,
    queryKey: [''],
  },
  latestProduct: {
    queryFn: API.latestProduct,
    queryKey: [''],
  },
})
export const queries = {
  useLatestSale: () => useQuery(keys.latestSale),
  useTopRated: () => useQuery(keys.topRated),
  useLatestProduct: () => useQuery(keys.latestProduct),
}
