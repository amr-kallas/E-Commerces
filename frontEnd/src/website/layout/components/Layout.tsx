import { Box, Container } from '@mui/material'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import ShowProduct from '@website/product/components/LatestSales'
import TopRated from '@website/product/components/topRated'
import LatestProducts from '@website/product/components/LatestProducts'
import Home from './Home'
import Contact from './Contact'
import Footer from './Footer'

const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Home />
      <Outlet />
      <ShowProduct />
      <Container>
        <TopRated />
        <LatestProducts />
      </Container>
      <Contact />
      <Footer/>
    </Box>
  )
}

export default Layout
