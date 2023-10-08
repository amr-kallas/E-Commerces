import { z } from "zod"
import { emailSchema, passwordSchema } from "../../../../utils/validation"
import { loginBody } from "../../api/type"

export const loginDefault:loginBody={
    email:'',
    password:''
}
const userLoginSchema=z.object({
    email:emailSchema,
    password:passwordSchema
})
export default userLoginSchema