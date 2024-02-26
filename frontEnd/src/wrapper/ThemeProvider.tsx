import { ThemeProvider } from '@emotion/react'
import theme from '@constants/theme'
import { useTranslation } from 'react-i18next'

const MaterialTheme = ({children}:{children:React.ReactNode}) => {
  const{i18n}=useTranslation()
  return (
    <ThemeProvider theme={theme(i18n.language)}> 
        {children}
    </ThemeProvider>
  )
}

export default MaterialTheme