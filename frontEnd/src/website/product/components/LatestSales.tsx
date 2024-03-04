import { Box, Container, useTheme, Typography } from '@mui/material'
import ProductCard from './ProductCard'
import { queries } from '../api/queries'
import Loading from './Loading'

const ShowProduct = () => {
  const theme = useTheme()
  const { data, isLoading } = queries.useLatestSale()
  return (
    <Container>
      <Box
        textAlign="center"
        sx={{
          width: '70%',
          m: 'auto',
          my: 8,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 'bold',
            fontSize: '3rem',
          }}
        >
          On Sale Now
        </Typography>
        <Typography
          sx={{
            color: 'rgb(18 48 38 / 75%)',
            fontSize: 22,
            lineHieght: 30,
            mt: 2,
          }}
        >
          Select products up to 30% off. Weekend Boots and Terrus Clogs will not
          be restocked until spring 2024. Get yours before they're gone!
        </Typography>
      </Box>
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
