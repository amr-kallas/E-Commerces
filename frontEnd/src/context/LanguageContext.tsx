import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import Storage from '@utils/storage'
type language = {
  lang: string
  setLang: Dispatch<SetStateAction<string>>
}
const langStorage = Storage.getLanguage()

const defaultValue = {
  lang: langStorage ?? 'en',
  setLang: ((value: string) => value) as React.Dispatch<
    React.SetStateAction<string>
  >,
}
const languageContext = createContext<language>(defaultValue)

export const useLanguageContext = () => useContext(languageContext)

export default languageContext
