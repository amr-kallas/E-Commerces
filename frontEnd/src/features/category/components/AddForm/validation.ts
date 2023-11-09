import { z } from 'zod'

export type addCategoryType = {
  title: string
  image?: File|string
}
export const defaultValues = {
  title: '',
  image: undefined,
}
const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
]
const schemaAddCategory: z.ZodType<addCategoryType> = z.object({
  title: z.string().min(1),
  image: z.union([
    z.any()
      .refine((file) => file!=undefined, 'required')
      .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        'Only .jpg, .jpeg, .png formats are supported.'
      ),
    z.string().url()
  ]),
});

export default schemaAddCategory
