import * as z from 'zod'
import { zodI18nMap } from 'zod-i18n-map'
import './i18n'
import i18n from './i18n'
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.too_small && issue.minimum == 1) {
    return { message: i18n.t('validation:required') }
  }
  if (issue.code === z.ZodIssueCode.custom) {
    if (issue.params?.custom === 'required') {
      return { message: i18n.t('validation:required') };
    }
    if (issue.params?.custom === 'max') {
      return { message: i18n.t('validation:maxSize') };
    }
    if (issue.params?.custom === 'fileType') {
      return { message: i18n.t('validation:support') };
    }
  }
  if (
    issue.code === z.ZodIssueCode.invalid_type &&
    issue.expected === 'object' &&
    issue.received === 'null'
  ) {
    return { message: i18n.t('validation:required') }
  }

  return zodI18nMap(issue, ctx)
}
z.setErrorMap(customErrorMap)
export default z
