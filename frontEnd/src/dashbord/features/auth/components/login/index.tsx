import {
  Alert,
  Container,
  Paper,
  Stack,
  Typography,
  Slide,
} from '@mui/material'
import greenland from '@assets/geranimo-WJkc3xZjSXw-unsplash.jpg'
import NameInput from '../NameInput'
import PasswordInput from '../PasswordInput'
import Submit from '@components/buttons/Submit'
import { useForm } from 'react-hook-form'
import userLoginSchema, { loginDefault } from './validation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { queries } from '../../api/queries'
import { loginBody } from '../../api/type'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Storage from '@utils/storage'
import GoogleButton from '../GoogleButton'
import { useTranslation } from 'react-i18next'

export const Login = () => {
  const { t } = useTranslation('auth', { keyPrefix: 'login' })
  const { i18n } = useTranslation()
  const { control, handleSubmit } = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: loginDefault,
  })
  const navigate = useNavigate()
  const login = queries.useLogin()
  const queryClient = useQueryClient()
  const onSubmit = async (data: loginBody) => {
    login.mutate(data, {
      onSuccess: (data) => {
        queryClient.setQueryData([''], data.user)
        Storage.setToken(data.token)
        navigate('/')
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }
  return (
    <Slide in dir="up" timeout={500}>
      <Container>
        <Stack
          direction="row"
          sx={{
            height: '100vh',
            m: 'auto',
            alignItems: 'center',
          }}
        >
          <Paper
            sx={{
              backgroundImage: {
                xs: ``,
                sm:
                  i18n.language == 'en'
                    ? `linear-gradient(100deg, rgb(255, 255, 255)49.9%,transparent 50%),url(${greenland})`
                    : `linear-gradient(260deg, rgb(255, 255, 255)49.9%,transparent 50%),url(${greenland})`,
              },
              width: 1,
              minHeight: 450,
              borderRadius: '12px',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <Stack
              sx={{
                p: 3,
                gap: '20px',
                width: { xs: '90%', sm: '45%' },
                mx: { xs: 'auto', sm: 'unset' },
              }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography
                variant="h4"
                sx={{
                  color: '#6c6cb5',
                  fontWeight: 'bold',
                  textAlign: { xs: 'center', sm: 'unset' },
                }}
              >
                {t('title')}
              </Typography>
              <NameInput control={control} name="email" label={t('email')} />
              <PasswordInput
                control={control}
                name="password"
                label={t('password')}
              />
              <Submit sx={{ width: '60%' }} isLoading={login.isLoading}>
                {t('submit')}
              </Submit>
              <GoogleButton label={t('google')} />
              {login.isError && <Alert severity="error">{t('error')}</Alert>}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Slide>
  )
}
