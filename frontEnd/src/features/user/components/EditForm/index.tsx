import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
} from '@mui/material'
import useEditSearchParams from '@hooks/useEditSearchParams'
import NameInput from '@features/auth/components/NameInput'
import { Controller, useForm } from 'react-hook-form'
import Submit from '@components/buttons/Submit'
import { z } from 'zod'
import editSchema, { defaultvalues } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '@mui/icons-material/Close'
import { keys, queries } from '../../api/queries'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import SomethingWentWrong from '@components/feedback/SomethingWentWrong'
import { User } from '../../api/type'
import { useTranslation } from 'react-i18next'
import { useSnackbarContext } from '@context/SnackbarContext'

export const EditForm = () => {
  const snackbar=useSnackbarContext()
  const { t } = useTranslation('user')
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof editSchema>>({
    resolver: zodResolver(editSchema),
    defaultValues: defaultvalues,
  })
  const [error, setErrors] = useState('')
  const queryClient = useQueryClient()
  const { id, isActive, clearSearchParams } = useEditSearchParams()
  const { data, isLoading, error: err } = queries.useUser(id)
  const edit = queries.useEdit()
  useEffect(() => {
    if (data) reset(data)
  }, [data])

  const onSubmit = async (body: User) => {
    edit.mutate(
      { id, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(keys.users._def)
          handleClose()
          snackbar({
            message:t("message.edit"),
            severity:'success'
          })
        },
        onError: (error: any) => {
          setErrors(error.response.status)
        },
      }
    )
  }

  const handleClose = () => {
    reset()
    clearSearchParams()
    setErrors('')
  }
  if ((err as any)?.response?.status == '404') {
    return <Navigate to={'error404'} replace={true} />
  }
  return (
    <Dialog
      open={isActive}
      onClose={handleClose}
      sx={{
        '.MuiDialog-paper': {
          width: 1,
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 10,
          top: 5,
        }}
      >
        <CloseIcon />
      </IconButton>
      {(err as any)?.response.status == '500' ? (
        <SomethingWentWrong text="axios error" />
      ) : (
        <Container>
          <DialogTitle
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '33px',
            }}
          >
            {t('edit.editUser')}
          </DialogTitle>
          <Stack
            spacing={4}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            {!isLoading ? (
              <>
                <NameInput control={control} label={t('edit.name')} name="name" />
                <NameInput
                  control={control}
                  label={t('edit.email')}
                  name="email"
                  helperText={
                    error == '500' && 'the email has already been token'
                  }
                  error={!!error || !!errors.email}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t('edit.role')}
                  </InputLabel>
                  <Controller
                    name="role"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <>
                        <Select
                          {...field}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="roles"
                        >
                          <MenuItem value={'1995'}>Admin</MenuItem>
                          <MenuItem value={'2001'}>User</MenuItem>
                          <MenuItem value={'1996'}>Writter</MenuItem>
                          <MenuItem value={'1999'}>Product Manager</MenuItem>
                        </Select>
                        <FormHelperText error>{error?.message}</FormHelperText>
                      </>
                    )}
                  />
                </FormControl>
              </>
            ) : (
              <>
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
              </>
            )}
            <Box
              sx={{
                textAlign: 'center',
                mt: 2,
                mb: '24px !important',
              }}
            >
              {!isLoading ? (
                <Submit isLoading={edit.isLoading} sx={{ width: 150 }}>
                  {t("edit.edit")}
                </Submit>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '3rem', width: 150, m: 'auto' }}
                />
              )}
            </Box>
          </Stack>
        </Container>
      )}
    </Dialog>
  )
}
