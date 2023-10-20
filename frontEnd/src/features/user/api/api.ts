import API_ROUTES from '../../../constants/apiRoutes'
import axios from '../../../lib/axios'

const API = {
  getAllUsers: async () => {
    const { data } = await axios.get(API_ROUTES.USERS.ALL)
    return data
  },
  getUser:async()=>{
    const {data}=await axios.get(API_ROUTES.USERS.USER)
    return data 
  },
  logout: async () => {
    const { data } = await axios.get(API_ROUTES.USERS.LOGOUT)
    return data
  },
}
export default API
