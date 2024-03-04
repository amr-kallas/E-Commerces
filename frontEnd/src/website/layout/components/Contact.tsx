import { useSnackbarContext } from '@context/SnackbarContext'
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { FormEvent, useState } from 'react'

const Contact = () => {
  const theme = useTheme()
  const snackbar = useSnackbarContext()
  const [email,setEmail]=useState('')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    snackbar({
      message: 'The subscription was successful',
      severity: 'success',
    })
    setEmail('')
  }
  return (
    <Box
      sx={{
        background: '#f3f3f3',
        minHeight: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        my:7
      }}
    >
      <Box
        textAlign="center"
        sx={{
          width: '70%',
          m: 'auto',
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
          Let's Stay in Touch
        </Typography>
        <Typography
          sx={{
            color: theme.palette.secondary.main,
            opacity: 0.75,
            fontSize: 22,
            lineHieght: 30,
            mt: 2,
          }}
        >
          Subscribe to our newsletter. Get $10 off your first purchase,
          exclusive offers and outdoor tips, trips and education.
        </Typography>
      </Box>
      <Stack
        direction="row"
        mt={1}
        mb={5}
        p={1}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          sx={{
            '.MuiInputBase-root': {
              borderBottomRightRadius: 'unset',
              borderTopRightRadius: 'unset',
            },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                border: '1px solid rgb(18 48 38 )',
              },
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            textTransform: 'capitalize',
            background: theme.palette.secondary.main,
            padding: '16px 32px',
            fontWeight: 'bold',
            borderBottomLeftRadius: 'unset',
            borderTopLeftRadius: 'unset',
            '&:hover': {
              background: theme.palette.secondary.main,
            },
          }}
        >
          Subscribe
        </Button>
      </Stack>
    </Box>
  )
}

export default Contact
