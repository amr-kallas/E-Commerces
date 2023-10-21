import { Alert, Container, Paper, Stack, Typography } from '@mui/material'
import greenland from '../../../../assets/geranimo-WJkc3xZjSXw-unsplash.jpg'
import NameInput from '../NameInput'
import PasswordInput from '../PasswordInput'
import Submit from '../../../../components/buttons/Submit'
import { useForm } from 'react-hook-form'
import userSignupSchema, { signupDefault } from './validation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { userBody } from '../../api/type'
import { queries } from '../../api/queries'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import Storage from '../../../../utils/storage'
import GoogleButton from '../GoogleButton'
export const Signup = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm<z.infer<typeof userSignupSchema>>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: signupDefault,
  })
  const signup = queries.useSignup()
  const queryClient = useQueryClient()
  const onSubmit = async (data: userBody) => {
    signup.mutate(data, {
      onSuccess: (data) => {
        Storage.setToken(data.token)
        queryClient.setQueriesData([''], data.user)
        navigate('/users')
      },
      onError: (error: any) => {
        setError(error.response.data.message)
      },
    })
  }
  return (
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
              sm: `linear-gradient(100deg, rgb(255, 255, 255)49.9%,transparent 50%),url(${greenland})`,
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
              Register Now
            </Typography>
            <NameInput control={control} name="name" />
            <NameInput control={control} name="email" />
            <PasswordInput control={control} name="password" />
            <Submit sx={{ width: '60%' }} isLoading={signup.isLoading}>
              Submit
            </Submit>
              <GoogleButton/>
            {error && <Alert severity="error">{error}</Alert>}
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
