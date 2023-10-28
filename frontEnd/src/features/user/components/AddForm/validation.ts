import { z } from 'zod'
import { emailSchema, passwordSchema } from '../../../../utils/validation'

export type userAddType = {
  name: string
  email: string
  password: string
  role: string | number
}
export const defaultValues = {
  name: '',
  email: '',
  password: '',
  role: '',
}

const addSchema: z.ZodType<userAddType> = z.object({
  name: z.string().min(1),
  email: emailSchema,
  password: passwordSchema,
  role: z.number(),
})
export default addSchema
