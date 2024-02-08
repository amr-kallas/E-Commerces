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

export const schemaEditProduct = z.object({
  category: z.number(),
  title: z.string().min(3),
  description: z.string().min(16),
  price: z.coerce.number().positive(),
  discount: z.coerce.number().nonnegative(),
  About: z.string().min(5),
  images: z
  .array(z.any())
  .nonempty({ message: 'At least one image is required' })
})
