import API_ROUTES from '../../../constants/apiRoutes'
import axios from '../../../lib/axios'
import { Paginate } from '../../../utils/type'
import { AddUser, AllUser, EditForm, GetMe, GetUser } from './type'

const API = {
  getAllUsers: async ({ limit, page }: Paginate) => {
    const { data } = await axios.get<AllUser<GetUser>>(API_ROUTES.USERS.ALL, {
      params: { limit, page },
    })
    return data
  },
  getUser: async (id: string) => {
    const { data } = await axios.get<GetUser>(API_ROUTES.USERS.GET(id))
    return data
  },
  getMe: async () => {
    const { data } = await axios.get<GetMe>(API_ROUTES.USERS.ME)
    return data
  },
  edit: async ({ id, body }: EditForm) => {
    const { data } = await axios.post(API_ROUTES.USERS.EDIT(id), body)
    return data
  },
  delete: async (id: string) => {
    const { data } = await axios.delete(API_ROUTES.USERS.DELETE(id))
    return data
  },
  add: async (body: AddUser) => {
    const { data } = await axios.post(API_ROUTES.USERS.ADD, body)
    return data
  },
  search: async (title: string) => {
    const { data } = await axios.post(API_ROUTES.USERS.SEARCH,{}, {
      params: { title },
    })
    return data
  },
  logout: async () => {
    const { data } = await axios.get(API_ROUTES.USERS.LOGOUT)
    return data
  },
}
export default API
