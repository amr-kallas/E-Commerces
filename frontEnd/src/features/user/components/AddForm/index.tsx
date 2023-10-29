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
  // Skeleton,
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import NameInput from '../../../auth/components/NameInput'
import { Controller, useForm } from 'react-hook-form'
import Submit from '../../../../components/buttons/Submit'
import useAddSearchParams from '../../../../hooks/useAddSearchParams'
import TextField from '../../../../components/inputs/TextField'
import { z } from 'zod'
import addSchema, { defaultValues } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { keys, queries } from '../../api/queries'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
const AddForm = () => {
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
  const onSubmit = (data: any) => {
    addUser.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.users._def)
        handleClose()
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
          Add User
        </DialogTitle>
        <Stack spacing={4} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <NameInput control={control} name="name" />
          <NameInput
            control={control}
            name="email"
            helperText={err == '422' && 'the email has already been token'}
            error={!!errors.email || err == '422'}
          />
          <TextField control={control} label="Password" name="password" />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Controller
              name="role"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="role"
                    error={!!error}
                  >
                    <MenuItem value={1995}>Admin</MenuItem>
                    <MenuItem value={2001}>User</MenuItem>
                    <MenuItem value={1996}>Writter</MenuItem>
                    <MenuItem value={1999}>Product Manager</MenuItem>
                  </Select>
                  <FormHelperText error>
                    {error ? 'Requierd' : ''}
                  </FormHelperText>
                </>
              )}
            />
          </FormControl>

          <Box
            sx={{
              textAlign: 'center',
              mt: 2,
              mb: '24px !important',
            }}
          >
            <Submit sx={{ width: 150 }} isLoading={addUser.isLoading}>
              Add
            </Submit>
          </Box>
        </Stack>
      </Container>
    </Dialog>
  )
}

export default AddForm
