import { Box, Typography, useTheme } from '@mui/material'
import { queries } from '@website/product/api/queries'
import Slider from './Slider'

const TopRated = () => {
  const theme=useTheme()
  const { data, isLoading } = queries.useTopRated()
  return (
    <Box>
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
          Top Rated
        </Typography>
        <Typography
          sx={{
            color: 'rgb(18 48 38 / 75%)',
            fontSize: 22,
            lineHieght: 30,
            mt: 2,
          }}
        >
          Socially and Environmentally Progressive Outdoor Footwear That Helps
          You #BeOutside
        </Typography>
      </Box>
      {isLoading && <Slider product={undefined} skeleton={isLoading} />}
      {data && <Slider product={data} skeleton={undefined} />}
    </Box>
  )
}

export default TopRated
