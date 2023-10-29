import ErrorIcon from '@mui/icons-material/Error'
import { Stack, Typography } from '@mui/material'

const SomethingWentWrong = ({ text }: { text: string }) => {
  return (
    <Stack>
      <ErrorIcon
        sx={{
          fontSize: '15rem',
          color: 'red',
          m: 'auto',
        }}
      />
      <Typography
        sx={{
          textAlign: 'center',
          marginTop: '2rem',
          fontSize: '3rem',
          color: '#1976d2',
          fontWeight: 'bold',
        }}
      >
        {text}
      </Typography>
    </Stack>
  )
}

export default SomethingWentWrong
