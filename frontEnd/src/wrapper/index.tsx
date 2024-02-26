import '@lib/i18n'
import React from 'react'
import QueryClients from './QueryClient'
import { CssBaseline } from '@mui/material'
import Progress from './ProgressProvider'
import Direction from './Direction'
import MaterialTheme from './ThemeProvider'
import LanguageProvider from './LanguageProvider'
import SnackbarProvider from './SnackbarProvider'
type child = {
  children: React.ReactNode
}
const index = ({ children }: child) => {
  return (
    <QueryClients>
      <MaterialTheme>
        <Direction>
          <LanguageProvider>
            <Progress>
              <SnackbarProvider>
                <CssBaseline />
                {children}
              </SnackbarProvider>
            </Progress>
          </LanguageProvider>
        </Direction>
      </MaterialTheme>
    </QueryClients>
  )
}

export default index
