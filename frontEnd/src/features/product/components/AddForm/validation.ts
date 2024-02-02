import z from '../../../../lib/zod'

export type AddProdcut = {
  category: number | string
  title: string
  description: string
  price: number
  discount: number
  About: string
  image?: File[]
}
export type DummyProdcut = {
  category: number | string
  title: string
  description: string
  price: number
  discount: number
  About: string
}
export type AddImgs = {
  product_id: string
  image: File
}
export type AddProductBody = {
  title: string
  About: string
  description: string
  price: number
  discount: number
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
export const dummyData: DummyProdcut = {
  category: 0,
  title: 'dummy',
  description: 'dummy dummy dummy',
  price: 20,
  discount: 0,
  About: 'dummy',
}
export const body: AddImgs = {
  product_id: '',
  image: new File([], 'default.txt'),
}

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const schemaAddProduct: z.ZodType<AddProdcut> = z.object({
  category: z.number(),
  title: z.string().min(3),
  description: z.string().min(16),
  price: z.coerce.number().positive(),
  discount: z.coerce.number().nonnegative(),
  About: z.string().min(5),
  image: z.array(
    z.any()
    .refine((file) => file != undefined, { params: { custom: 'required' } })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      params: { custom: 'fileType' },
    })),
})
export default schemaAddProduct
