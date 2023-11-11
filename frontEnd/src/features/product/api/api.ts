import API_ROUTES from "../../../constants/apiRoutes"
import axios from "../../../lib/axios"

const API={
    getAll:async()=>{
        const {data}=await axios.get(API_ROUTES.PRODUCT.ALL)
        return data
    },
    Add:async(body:any)=>{
        const {data}=await axios.post(API_ROUTES.PRODUCT.ADD,body)
        return data
    }
}
export default API