import { z } from 'zod'
import { emailSchema } from '../../../../utils/validation'

export type userEditType = {
  name: string
  email: string
}

const editSchema: z.ZodType<userEditType> = z.object({
  name: z.string().min(1),
  email: emailSchema,
})
export default editSchema
