import { Box, Container } from '@mui/material'
import ProductCard from './ProductCard'
import { queries } from '../api/queries'

const ShowProduct = () => {
  const { data } = queries.useLatestSale()
  return (
    <Container>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '40px',
        }}
      >
        {data?.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </Box>
    </Container>
  )
}

export default ShowProduct
