import { z } from 'zod'

export type AddProdcut = {
  category: string | number
  title: string
  description: string
  price: number
  discount: number
  About: string
  images?: File | string | File[]
}
export const defaultProductValue = {
  category: '',
  title: '',
  description: '',
  price: 0,
  discount: 0,
  About: '',
  images: [],
}
export const dummyData = {
  category:'',
  title: 'dummy',
  description: 'dummy dummy dummy',
  price: 20,
  discount: 0,
  About: 'dummy',
}
// const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const schemaAddProduct: z.ZodType<AddProdcut> = z.object({
  category: z.number(),
  title: z.string().min(3),
  description: z.string().min(16),
  price: z.coerce.number().positive(),
  discount: z.coerce.number().nonnegative(),
  About: z.string().min(5),
  images: z.union([
    z
      .array(z.any())
      .min(1)
      .refine((files)=>(files.every((file)=>ACCEPTED_IMAGE_TYPES.includes(file?.type))),{
        message: 'Only .jpg, .jpeg, .png formats are supported.'
      }),
    z
      .any()
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
        message: 'Only .jpg, .jpeg, .png formats are supported.',
      }),
  ]),
})
export default schemaAddProduct
