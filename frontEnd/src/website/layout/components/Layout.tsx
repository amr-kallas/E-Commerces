import { Box, Container } from '@mui/material'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import ShowProduct from '@website/product/components/latestSale'
import TopRated from '@website/product/components/topRated'

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Outlet />
      <ShowProduct />
      <Container sx={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
      <TopRated/>
      </Container>
    </Box>
  )
}

export default Layout
