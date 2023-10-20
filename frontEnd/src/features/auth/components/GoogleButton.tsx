import { Box, Stack } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'

const GoogleButton = () => {
  return (
    <Stack
              direction="row"
              sx={{
                width: 'fit-content',
                alignItems: 'center',
                bgcolor: '#1976d2',
                borderRadius: 2,
                cursor: 'pointer',
                textDecoration: 'none',
                margin: { xs: 'auto', sm: 0 },
              }}
              component="a"
              href="http://127.0.0.1:8000/login-google"
            >
              <Box
                sx={{
                  p: 1,
                  bgcolor: 'white',
                  border: '1px solid grey',
                  borderTopLeftRadius: '8px',
                  borderBottomLeftRadius: '8px',
                  display: 'flex',
                }}
              >
                <GoogleIcon color="error" />
              </Box>
              <Box
                sx={{
                  p: 1,
                  color: 'white',
                }}
              >
                Sign in with Google
              </Box>
            </Stack>
  )
}

export default GoogleButton