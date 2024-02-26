import API_ROUTES from '@constants/apiRoutes'
import axios from '@lib/axios'
import { objectToFormData } from '@utils/transform'
import { Paginate } from '@utils/type'
import {
  AddImg,
  AddImgBody,
  AddProduct,
  EditProductBody,
  AllProduct,
  AddProductBody,
  Product,
} from './type'
let newProgress: number
const API = {
  getAll: async ({ limit, page }: Paginate) => {
    const { data } = await axios.get<AllProduct<Product>>(
      API_ROUTES.PRODUCT.ALL,
      {
        params: { limit, page },
      }
    )
    return data
  },
  get: async (id: string) => {
    const { data } = await axios.get<Product[]>(
      API_ROUTES.PRODUCT.GET(id)
    )
    return data
  },
  Add: async (body: AddProductBody) => {
    const { data } = await axios.post<AddProduct>(
      API_ROUTES.PRODUCT.ADD,
      objectToFormData(body)
    )
    return data
  },
  AddImg: async ({ body, changePercentageAtIndex }: AddImgBody) => {
    const { data } = await axios.post<AddImg>(
      API_ROUTES.PRODUCT.ADD_IMG,
      objectToFormData(body),
      {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total)
            newProgress = Math.round(
              (progressEvent.loaded / progressEvent?.total) * 100
            )
          changePercentageAtIndex(newProgress)
        },
      }
    )

    return data
  },
  Edit: async ({ id, body }: EditProductBody) => {
    const { data } = await axios.post(
      API_ROUTES.PRODUCT.EDIT(id),
      objectToFormData(body)
    )
    return data
  },
  search: async (title: string) => {
    const { data } = await axios.post<Product[]>(
      API_ROUTES.PRODUCT.SEARCH,
      {},
      {
        params: { title },
      }
    )
    return data
  },
  Delete: async (id: string) => {
    const { data } = await axios.delete(API_ROUTES.PRODUCT.DELETE(id))
    return data
  },
  DeleteImg: async (id: string) => {
    const { data } = await axios.delete(API_ROUTES.PRODUCT.DELETE_IMG(id))
    return data
  },
}
export default API
