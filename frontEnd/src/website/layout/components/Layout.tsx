import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import ShowProduct from '@website/product/components/LatestSales'
import TopRated from '@website/product/components/topRated'
import LatestProducts from '@website/product/components/LatestProducts'

const Layout = () => {
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <Box>
      <Navbar />
      <Outlet />
      <ShowProduct />
      <Container
        sx={{
          display: 'flex',
          gap: 1.5,
          flexDirection:isMediumScreen?'column':'row'
        }}
      >
        <TopRated />
        <LatestProducts />
      </Container>
    </Box>
  )
}

export default Layout
