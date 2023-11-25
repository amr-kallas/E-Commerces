import  z  from '../../../../lib/zod'
import i18n from '../../../../lib/i18n'

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
      .refine((file) => file != undefined, i18n.t('validation:required'))
      .refine((file) => file?.size <= MAX_FILE_SIZE, i18n.t('validation:maxSize'))
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        i18n.t('validation:support')
      ),
    z.string().url(),
  ]),
})

export default schemaAddCategory
