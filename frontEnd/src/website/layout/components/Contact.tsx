import { Box, Button, Stack, TextField, Typography } from '@mui/material'

const Contact = () => {
  return (
    <Box
      sx={{
        background: '#f3f3f3',
        minHeight: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
            color: 'rgb(18, 48, 38)',
            fontWeight: 'bold',
            fontSize: '3rem',
          }}
        >
          Let's Stay in Touch
        </Typography>
        <Typography
          sx={{
            color: 'rgb(18 48 38 / 75%)',
            fontSize: 22,
            lineHieght: 30,
            mt: 2,
          }}
        >
          Subscribe to our newsletter. Get $10 off your first purchase,
          exclusive offers and outdoor tips, trips and education.
        </Typography>
      </Box>
      <Stack direction="row" mt={1} mb={5} p={1}>
        <TextField
          placeholder="Enter your email"
          type="email"
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
          sx={{
            textTransform: 'capitalize',
            background: 'rgb(18, 48, 38)',
            padding: '16px 32px',
            fontWeight: 'bold',
            borderBottomLeftRadius: 'unset',
            borderTopLeftRadius: 'unset',
            '&:hover':{
                background: 'rgb(18, 48, 38)',

            }
          }}
        >
          Subscribe
        </Button>
      </Stack>
    </Box>
  )
}

export default Contact
