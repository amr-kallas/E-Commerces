import API_ROUTES from '../../../constants/apiRoutes'
import axios from '../../../lib/axios'
import { AuthBody, loginBody, userBody } from './type'
const API = {
  signup: async (body: userBody) => {
    const { data } = await axios.post<AuthBody>(API_ROUTES.SIGN.REGISTER, body)
    return data
  },
  login: async (body: loginBody) => {
    const { data } = await axios.post<AuthBody>(API_ROUTES.SIGN.LOGIN, body)
    console.log(data)
    return data
  },
  google: async () => {
    const { data } = await axios.get(
      API_ROUTES.SIGN.GOOGLE + window.location.search
    )
    return data
  },
}
export default API
