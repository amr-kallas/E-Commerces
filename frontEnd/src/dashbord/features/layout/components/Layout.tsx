import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Appbar from './Appbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

export const Layout = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <Box sx={{ display: 'flex' }}>
      <Appbar open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'auto' }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  )
}
