import { Box, Typography, useTheme } from '@mui/material'

const Footer = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        background: theme.palette.secondary.main,
        color: 'white',
        padding: '20px',
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Developed by{' '}
        <span style={{ color: '#90ee90', fontWeight: 'bold' }}>
          Amr Kallas{' '}
        </span>{' '}
        . All rights reserved.
      </Typography>
    </Box>
  )
}

export default Footer
