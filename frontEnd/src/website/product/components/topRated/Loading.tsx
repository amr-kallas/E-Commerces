import { Skeleton as MuiSkeleton } from '@components/feedback/Skeleton'
import { Box, Skeleton, Stack, useMediaQuery, useTheme } from '@mui/material'
const Loading = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Stack direction={isSmallScreen ? 'column' : 'row'} p={2} spacing={2}>
      <Skeleton
        variant="rectangular"
        sx={{
          width: isSmallScreen ? 1 : 225,
          height: 150,
          flex: isSmallScreen ? 'auto' : 1,
        }}
      />
      <Box flex={1}>
        <MuiSkeleton widthRange={{ min: 30, max: 70 }} />
        <Box mt={1}>
          <MuiSkeleton widthRange={{ min: 100, max: 120 }} />
          <MuiSkeleton widthRange={{ min: 100, max: 120 }} />
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <MuiSkeleton widthRange={{ min: 30, max: 40 }} />
            <Skeleton variant="circular" width={30} height={30} />
          </Stack>
        </Box>
      </Box>
    </Stack>
  )
}

export default Loading
