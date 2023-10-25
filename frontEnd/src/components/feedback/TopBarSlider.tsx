import { Box, LinearProgress } from '@mui/material'

const TopBarSlider = () => {
  return (
    <Box sx={{ width: '100%',position:'absolute',left:0,top:0 }}>
      <LinearProgress />
    </Box>
  )
}

export default TopBarSlider