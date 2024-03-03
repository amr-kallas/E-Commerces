import { Box, Typography } from '@mui/material'
import { queries } from '../api/queries'
import ProductCard from './ProductCard'
import Loading from './Loading'

const LatestProducts = () => {
  const { data, isLoading } = queries.useLatestProduct()
  return (
    <Box
      flex={0.5}
      data-aos="fade-left"
      data-aos-easing="ease-in-sine"
      data-aos-duration="1500"
      data-aos-once="true"
      sx={{
        overflow: 'hidden',
      }}
    >
      <Box
        textAlign="center"
        sx={{
          width: '70%',
          m: 'auto',
          mb:8
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: 'rgb(18, 48, 38)',
            fontWeight: 'bold',
            fontSize: '3rem',
          }}
        >
          Latest Products
        </Typography>
        <Typography
          sx={{
            color: 'rgb(18 48 38 / 75%)',
            fontSize: 22,
            lineHieght: 30,
            mt: 2,
          }}
        >
          Walking groups, community groups or employee gifting - get in contact
          with us to get your discount on all bulk purchases.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
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
