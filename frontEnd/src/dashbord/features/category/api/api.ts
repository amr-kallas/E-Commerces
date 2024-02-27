import API_ROUTES from '@constants/apiRoutes'
import axios from '@lib/axios'
import { objectToFormData } from '@utils/transform'
import { Paginate } from '@utils/type'
import { AllCategories, Edit, categoryBody } from './type'

const API = {
  getAll: async ({ limit, page }: Paginate) => {
    const { data } = await axios.get<AllCategories<categoryBody>>(
      API_ROUTES.CATEGORY.ALL,
      {
        params: { limit, page },
      }
    )
    return data
  },
  get: async (id: string) => {
    const { data } = await axios.get<categoryBody>(API_ROUTES.CATEGORY.GET(id))
    return data
  },
  add: async (body: FormData) => {
    const data = await axios.post(
      API_ROUTES.CATEGORY.ADD,
      objectToFormData(body)
    )
    return data
  },
  edit: async ({ id, body }: Edit) => {
    const data = await axios.post(
      API_ROUTES.CATEGORY.EDIT(id),
      objectToFormData(body)
    )
    return data
  },
  delete: async (id: string) => {
    const data = await axios.delete(API_ROUTES.CATEGORY.DELETE(id))
    return data
  },
  search: async (title: string) => {
    const { data } = await axios.post<categoryBody[]>(
      API_ROUTES.CATEGORY.SEARCH,
      {},
      {
        params: { title },
      }
    )
    return data
  },
}
export default API
