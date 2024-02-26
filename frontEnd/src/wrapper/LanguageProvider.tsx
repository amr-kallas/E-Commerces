import { useEffect, useState } from 'react'
import languageContext from '@context/LanguageContext'
import Storage from '@utils/storage'
import { changeLanguage } from '@lib/i18n'
const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const langStorage = Storage.getLanguage()
  const [lang, setLang] = useState(langStorage ?? 'en')
  useEffect(() => {
    changeLanguage(lang)
  }, [lang])
  return (
    <languageContext.Provider value={{ lang, setLang }}>
      {children}
    </languageContext.Provider>
  )
}

export default LanguageProvider
