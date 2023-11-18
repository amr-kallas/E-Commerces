import { z } from 'zod'

export type AddProdcut = {
  category: number |string
  title: string
  description: string
  price: number
  discount: number
  About: string
  image?: File | undefined
}
export type DummyProdcut = {
  category: number |string
  title: string
  description: string
  price: number
  discount: number
  About: string
}
export type AddImgs = {
  product_id: string
  image?: File | undefined
}
export const defaultProductValue: AddProdcut = {
  category: '',
  title: '',
  description: '',
  price: 0,
  discount: 0,
  About: '',
  image: undefined,
}
export const dummyData:DummyProdcut = {
  category: 0,
  title: 'dummy',
  description: 'dummy dummy dummy',
  price: 20,
  discount: 0,
  About: 'dummy',
}
export const imgUpload: AddImgs = {
  product_id: '',
  image: undefined,
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
  image: z
    .any()
    .refine((file) => file != undefined, 'required')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png formats are supported.'
    ),
})
export default schemaAddProduct
