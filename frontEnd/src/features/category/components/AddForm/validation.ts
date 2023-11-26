import z from '../../../../lib/zod'

export type addCategoryType = {
  title: string
  image?: File | File[] | string
}
export const defaultValues = {
  title: '',
  image: undefined,
}
const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const schemaAddCategory: z.ZodType<addCategoryType> = z.object({
  title: z.string().min(1),
  image: z.union([
    z
      .any()
      .refine((file) => file != undefined, { params: { custom: 'required' } })
      .refine(
        (file) => file?.size <= MAX_FILE_SIZE,
        {params: { custom: 'max' }},

      )
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        {    params: { custom: 'fileType' },
      }
      ),
    z.string().url(),
  ]),
})

export default schemaAddCategory
