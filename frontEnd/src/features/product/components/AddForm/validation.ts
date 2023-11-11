import { z } from 'zod'

export type AddProdcut = {
  category: string | number
  title: string
  description: string
  price: number
  discount: number
  About:string
}
export const defaultProductValue = {
  category: '',
  title: '',
  description: '',
  price: 0,
  discount: 0,
  About:''
}
const schemaAddProduct: z.ZodType<AddProdcut> = z.object({
  category: z.number(),
  title: z.string().min(3),
  description: z.string().min(16),
  price: z.coerce.number().positive(),
  discount: z.coerce.number().nonnegative(),
  About: z.string().min(5),

})
export default schemaAddProduct
