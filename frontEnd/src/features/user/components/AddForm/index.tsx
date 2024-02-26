import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import NameInput from '@features/auth/components/NameInput'
import Select from '@components/inputs/Select'
import { useForm } from 'react-hook-form'
import Submit from '@components/buttons/Submit'
import useAddSearchParams from '@hooks/useAddSearchParams'
import TextField from '@components/inputs/TextField'
import { z } from 'zod'
import addSchema, { defaultValues } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { keys, queries } from '../../api/queries'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { AddUser } from '../../api/type'
import { useTranslation } from 'react-i18next'
import { useSnackbarContext } from '@context/SnackbarContext'
const AddForm = () => {
  const { t } = useTranslation('user')
  const snackbar = useSnackbarContext()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof addSchema>>({
    resolver: zodResolver(addSchema),
    defaultValues: defaultValues,
  })
  const { isActive, clearSearchParams } = useAddSearchParams()
  const [err, setErr] = useState('')
  const addUser = queries.useAdd()
  const queryClient = useQueryClient()
  const handleClose = () => {
    reset()
    clearSearchParams()
    setErr('')
  }
  const onSubmit = (body: AddUser) => {
    addUser.mutate(body, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.users._def)
        handleClose()
        snackbar({
          message: t('message.add'),
          severity: 'success',
        })
      },
      onError: (error: any) => {
        setErr(error?.response.status)
      },
    })
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
      <Container>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '33px',
          }}
        >
          {t('add.addUser')}
        </DialogTitle>
        <Stack spacing={4} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <NameInput control={control} name="name" label={t('add.name')} />
          <NameInput
            control={control}
            name="email"
            label={t('add.email')}
            helperText={err == '422' && 'the email has already been token'}
            error={!!errors.email || err == '422'}
          />
          <TextField
            control={control}
            name="password"
            label={t('add.password')}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t('add.role')}
            </InputLabel>
            <Select name="role" control={control} label="role" message={null}>
              <MenuItem value={'1995'}>Admin</MenuItem>
              <MenuItem value={'2001'}>User</MenuItem>
              <MenuItem value={'1996'}>Writter</MenuItem>
              <MenuItem value={'1999'}>Product Manager</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{
              textAlign: 'center',
              mt: 2,
              mb: '24px !important',
            }}
          >
            <Submit sx={{ width: 150 }} isLoading={addUser.isLoading}>
              {t('add.add')}
            </Submit>
          </Box>
        </Stack>
      </Container>
    </Dialog>
  )
}

export default AddForm
