import i18n, { InitOptions } from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@localization/en'
import ar from '@localization/ar'
import Storage from '@utils/storage'

const resources = {
  en,
  ar,
}

const i18nOptions: InitOptions = {
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
}

i18n.use(initReactI18next).init(i18nOptions)

export const changeLanguage = (lang: string) => {
  Storage.setLanguage(lang)
  const language=Storage.getLanguage()
  i18n.changeLanguage(lang)
  document.documentElement.lang=lang
  switch (language) {
    case 'ar':
      document.dir = 'rtl'
      break
    default:
      document.dir = 'ltr'
  }
}

export default i18n
