import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import HomeHero from '@assets/HomepageHero.webp'
const Home = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '40rem',
      }}
    >
      <Box
        sx={{
          position: isSmallScreen ? 'relative' : 'absolute',
          inset: 0,
          background: '#f3f3f3',
        }}
      >
        <img src={HomeHero} alt="" style={{ width: '100%', height: '40rem' }} />
      </Box>
      <Box
        sx={{
          position: isSmallScreen ? 'relative' : 'absolute',
          left: isSmallScreen ? '0' : '50%',
          top: isSmallScreen ? '0' : '50%',
          transform: isSmallScreen ? 'none' : 'translate(-50%, -50%)',
          textAlign: 'center',
          width: 1,
          p: '2rem',
          background: isSmallScreen ? '#f3f3f3' : 'none',
        }}
      >
        <Typography
          sx={{
            color: isSmallScreen ? 'black' : 'white',
            fontSize: '1.5rem',
            opacity: '0.7',
          }}
        >
          Boots That Take You From Winter To Spring
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: isSmallScreen ? theme.palette.secondary.main : 'white',
            fontWeight: 'bold',
          }}
        >
          Get Up To 40% Off Now
        </Typography>
        <Button
          sx={{
            textTransform: 'capitalize',
            background: isSmallScreen ? theme.palette.secondary.main : 'white',
            padding: '8px 24px',
            marginTop: '16px',
            color: isSmallScreen ? 'white' : 'black',
            '&:hover': {
              background: isSmallScreen
                ? theme.palette.secondary.main
                : 'white',
            },
          }}
        >
          Shop sale
        </Button>
      </Box>
    </Box>
  )
}

export default Home
