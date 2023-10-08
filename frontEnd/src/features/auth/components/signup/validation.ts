import { z } from "zod";
import { userBody } from "../../api/type";
import { emailSchema, passwordSchema } from "../../../../utils/validation";

export const signupDefault:userBody={
    name:"",
    email:"",
    password:""
}
const userSignupSchema:z.ZodType<userBody>=z.object({
    name:z.string().trim().min(1),
    email:emailSchema,
    password:passwordSchema
})
export default userSignupSchema