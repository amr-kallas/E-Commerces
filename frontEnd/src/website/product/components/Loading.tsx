import { Skeleton as MuiSkeleton } from '@components/feedback/Skeleton'
import { Box, Skeleton, Stack } from '@mui/material'

const Loading = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" sx={{ maxWidth: 326, height: 190 }} />
      <MuiSkeleton widthRange={{ min: 170, max: 180 }} />
      <MuiSkeleton widthRange={{ min: 130, max: 180 }} />
      <Stack direction="row" sx={{
        justifyContent:"space-between",
        alignItems:"center"
      }}>
      <MuiSkeleton widthRange={{ min: 30, max: 40 }} />
      <Skeleton variant='circular' width={30} height={30} />
      </Stack>
    </Box>
  )
}

export default Loading
