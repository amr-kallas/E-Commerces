import API_ROUTES from '../../../constants/apiRoutes'
import axios from '../../../lib/axios'
import { EditForm } from './type'

const API = {
  getAllUsers: async () => {
    const { data } = await axios.get(API_ROUTES.USERS.ALL)
    return data
  },
  getUser: async (id: string) => {
    const { data } = await axios.get(API_ROUTES.USERS.GET(id))
    return data
  },
  getMe: async () => {
    const { data } = await axios.get(API_ROUTES.USERS.ME)
    return data
  },
  edit: async ({ id, ...body }: EditForm) => {
    const { data } = await axios.post(API_ROUTES.USERS.EDIT(id), body)
    return data
  },
  delete: async (id: string) => {
    const { data } = await axios.delete(API_ROUTES.USERS.DELETE(id))
    return data
  },
  add: async (body:any) => {
    const { data } = await axios.post(API_ROUTES.USERS.ADD,body)
    return data
  },
  logout: async () => {
    const { data } = await axios.get(API_ROUTES.USERS.LOGOUT)
    return data
  },
}
export default API
