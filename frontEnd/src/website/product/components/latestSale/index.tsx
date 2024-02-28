import { Box, Container, Typography } from '@mui/material'
import ProductCard from '../ProductCard'
import { queries } from '../../api/queries'
import Loading from '../Loading'

const ShowProduct = () => {
  const { data, isLoading } = queries.useLatestSale()
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" fontWeight="bold">
        Latest Sale Product
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '40px',
          my: 4,
        }}
      >
        {data?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
        {isLoading && (
          <>
            <Loading />
            <Loading />
            <Loading />
          </>
        )}
      </Box>
    </Container>
  )
}

export default ShowProduct
