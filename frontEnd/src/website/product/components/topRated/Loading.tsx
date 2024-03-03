import { Skeleton as MuiSkeleton } from '@components/feedback/Skeleton'
import { Box, Skeleton, Stack } from '@mui/material'
const Loading = () => {
  return (
    <Stack p={2} spacing={2}>
      <Skeleton
        variant="rectangular"
        sx={{
          width: 250,
          height: 250,
        }}
      />
      <Box flex={1}>
        <MuiSkeleton widthRange={{ min: 30, max: 70 }} />
        <Box mt={1}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Skeleton
              variant="rectangular"
              sx={{
                m: 'auto',
                borderRadius: '1rem',
                width: '90%',
                height: 50,
              }}
            />
          </Stack>
        </Box>
      </Box>
    </Stack>
  )
}

export default Loading
