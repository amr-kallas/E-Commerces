import { Box } from '@mui/material'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import ShowProduct from '@website/product/components'

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
      <ShowProduct/>
    </Box>
  )
}

export default Layout
