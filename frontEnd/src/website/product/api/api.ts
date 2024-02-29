import API_ROUTES from '@constants/apiRoutes'
import axios from '@lib/axios'
import { Product } from './type'

const API = {
  latestSale: async () => {
    const { data } = await axios.get<Product[]>(API_ROUTES.PRODUCT.LATEST_SALE)
    return data
  },
  topRatedSale: async () => {
    const { data } = await axios.get<Product[]>(API_ROUTES.PRODUCT.TOP_RATED)
    return data
  },
  latestProduct: async () => {
    const { data } = await axios.get<Product[]>(API_ROUTES.PRODUCT.LATEST)
    return data
  },
}
export default API
