import React from 'react'
import QueryClients from './QueryClient'
import { CssBaseline } from '@mui/material'
import Progress from './Progress'
type child = {
  children: React.ReactNode
}
const index = ({ children }: child) => {
  return (
    <QueryClients>
      <Progress>
        <CssBaseline />
        {children}
      </Progress>
    </QueryClients>
  )
}

export default index
