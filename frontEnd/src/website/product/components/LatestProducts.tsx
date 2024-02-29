import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { queries } from '../api/queries'
import ProductCard from './ProductCard'
import Loading from './Loading'

const LatestProducts = () => {
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))
  const { data, isLoading } = queries.useLatestProduct()
  return (
    <Box
      flex={0.5}
      data-aos="fade-left"
      data-aos-easing="ease-in-sine"
      data-aos-duration="1500"
      data-aos-once="true"
    >
      <Typography
        variant="h4"
        sx={{
          mt: isMediumScreen ? 5 : 0,
          textAlign: isMediumScreen ? 'center' : 'left',
          fontWeight: 'bold',
          background: '#1976d2',
          color: 'white',
          padding: '16px',
          width: 'fit-content',
          marginInline: 'auto',
        }}
      >
        Latest Products
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '10px',
          my: 4,
        }}
      >
        {data?.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
        {isLoading && (
          <>
            <Loading />
            <Loading />
            <Loading />
          </>
        )}
      </Box>
    </Box>
  )
}

export default LatestProducts
