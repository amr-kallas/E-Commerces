import { z } from 'zod'
export type product={
  category:number | string,
  title:string,
  description:string
  price:number
  discount:number,
  About:string,
  images:string[]|File|File[]
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
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export const schemaEditProduct = z.object({
  category: z.number(),
  title: z.string().min(3),
  description: z.string().min(16),
  price: z.coerce.number().positive(),
  discount: z.coerce.number().nonnegative(),
  About: z.string().min(5),
  images: z
    .any()
    .refine((file) => file != undefined, { params: { custom: 'required' } })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      params: { custom: 'fileType' },
    }),
})
