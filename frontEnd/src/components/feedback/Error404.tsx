import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Error404 = () => {
  const { t } = useTranslation('error')
  return (
    <Container>
      <Stack
        sx={{
          width: '100%',
          m: 'auto',
          maxWidth: '1000px',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            mt: '20px',
            textAlign: 'center',
          }}
        >
          404
        </Typography>
        <Box width="100%" height="370px">
          <img
            style={{ width: '100%', height: '100%' }}
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          />
        </Box>
        <Box margin="auto">
          <Typography variant="h4" fontFamily="cursive" fontWeight="bold">
            {t('lost')}
          </Typography>
          <Typography margin="10px">{t('available')}</Typography>
          <Link to={'/'} style={{ display: 'block', textAlign: 'center' }}>
            <Button variant="contained">{t('home')} </Button>
          </Link>
        </Box>
      </Stack>
    </Container>
  )
}

export default Error404
