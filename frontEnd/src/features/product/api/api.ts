import API_ROUTES from "../../../constants/apiRoutes"
import axios from "../../../lib/axios"
import { objectToFormData } from "../../../utils/transform"

const API={
    getAll:async()=>{
        const {data}=await axios.get(API_ROUTES.PRODUCT.ALL)
        return data
    },
    Add:async(body:any)=>{
        const {data}=await axios.post(API_ROUTES.PRODUCT.ADD,objectToFormData(body))
        return data
    },
    Edit:async({id,body}:{id:string,body:any})=>{
        const {data}=await axios.post(API_ROUTES.PRODUCT.EDIT(id),objectToFormData(body))
        return data
    },
    Delete:async(id:string)=>{
        const {data}=await axios.delete(API_ROUTES.PRODUCT.DELETE(id))
        return data
    },
}
export default API