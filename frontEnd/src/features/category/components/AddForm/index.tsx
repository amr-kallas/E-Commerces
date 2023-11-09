import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
} from '@mui/material'
import NameInput from '../../../auth/components/NameInput'
import Submit from '../../../../components/buttons/Submit'
import useAddSearchParams from '../../../../hooks/useAddSearchParams'
import { useForm } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import ImageUpload from './imageUpload'
import { z } from 'zod'
import schemaAddCategory, { defaultValues } from './validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { keys, queries } from '../../api/queries'
import { useQueryClient } from '@tanstack/react-query'
const AddCategory = () => {
  const {
    // getValues,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof schemaAddCategory>>({
    resolver: zodResolver(schemaAddCategory),
    defaultValues: defaultValues,
  })
  const { isActive, clearSearchParams } = useAddSearchParams()
  const add = queries.useAdd()
  const handleClose = () => {
    reset()
    clearSearchParams()
  }
  const queryClient = useQueryClient()

  const onSubmit = (data: any) => {
    const form = new FormData()
    form.append('image', data.image)
    form.append('title', data.title)
    add.mutate(form, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getAll._def)
        handleClose()
      },
      onError: (error: any) => {
        console.log(error)
      },
    })
  }
  const handleUploadImage = (files: File) => {
    setValue('image', files)
  }
  const handleCancelImage = () => {
    setValue('image', undefined)
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
          Add Category
        </DialogTitle>
        <Stack spacing={4} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <NameInput control={control} name="title" />
          <ImageUpload
            name="image"
            error={errors.image?.message}
            onUpload={handleUploadImage}
            cancel={handleCancelImage}
            url={undefined}
          />
          <Box
            sx={{
              textAlign: 'center',
              mt: 2,
              mb: '24px !important',
            }}
          >
            <Submit sx={{ width: 150 }} isLoading={add.isLoading}>
              Add
            </Submit>
          </Box>
        </Stack>
      </Container>
    </Dialog>
  )
}

export default AddCategory
