import  z  from '../../../../lib/zod'
import { emailSchema } from '../../../../utils/validation'

export type userEditType = {
  name: string
  email: string
  role:string
}
export const defaultvalues={
  name:'',
  email:'',
  role:''
}
const editSchema: z.ZodType<userEditType> = z.object({
  name: z.string().min(1),
  email: emailSchema,
  role:z.string().min(1)
  
})
export default editSchema
