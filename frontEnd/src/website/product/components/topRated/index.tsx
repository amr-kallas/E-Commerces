import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import Card from './Card'
import { queries } from '@website/product/api/queries'
import Loading from './Loading'

const TopRated = () => {
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const { data, isLoading } = queries.useTopRated()
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        maxWidth: 1,
        flex: isSmallScreen ? 1 : isMediumScreen ? 0.7 : 0.5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          bgcolor: theme.palette.primary.main,
          p: 3,
          textAlign: 'center',
          color: 'white',
        }}
      >
        Top Rated
      </Typography>
      {isLoading && (
        <>
          <Loading />
          <Loading />
          <Loading />
        </>
      )}
      {data?.map((item) => (
        <Card key={item.id} product={item} />
      ))}
    </Box>
  )
}

export default TopRated
