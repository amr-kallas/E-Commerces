import useEditSearchParams from '../../../../hooks/useEditSearchParams'
import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Skeleton,
  Stack,
} from '@mui/material'
import NameInput from '../../../auth/components/NameInput'
import Submit from '../../../../components/buttons/Submit'
import CloseIcon from '@mui/icons-material/Close'
import ImageUpload from '../../../../components/inputs/imageUpload'
import { useForm } from 'react-hook-form'
import schemaAddCategory, { defaultValues } from '../AddForm/validation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { keys, queries } from '../../api/queries'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const EditCategory = () => {
  const { id, isActive, clearSearchParams } = useEditSearchParams()
  const { data, isLoading } = queries.useCategory(id)
  const edit = queries.useEdit()
  const queryClient = useQueryClient()
  const {
    setValue,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schemaAddCategory>>({
    resolver: zodResolver(schemaAddCategory),
    defaultValues: data ?? defaultValues,
  })
  useEffect(() => {
    if (data) reset(data)
  }, [data])
  const handleClose = () => {
    reset(defaultValues)
    clearSearchParams()
  }
  const handleUploadImage = (files: File | File[]) => {
    setValue('image', files)
  }
  const handleCancelImage = () => {
    setValue('image', undefined)
  }
  const onSubmit = (body: any) => {
    // const body = new FormData()
    // body.append('title', bodys.title)
    // body.append('image', bodys.image)
    edit.mutate(
      { id, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(keys.getAll._def)
          queryClient.invalidateQueries(keys.get._def)
          handleClose()
        },
        onError: (error) => {
          console.log(error)
        },
      }
    )
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
          Edit Category
        </DialogTitle>
        {!isLoading ? (
          <Stack
            spacing={4}
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
          >
            <NameInput control={control} name="title" />
            <ImageUpload
              name="image"
              multiple={false}
              error={errors.image?.message}
              onUpload={handleUploadImage}
              cancel={handleCancelImage}
              url={data?.image}
              isProduct={false}
              disabled={false}
            />
            <Box
              sx={{
                textAlign: 'center',
                mt: 2,
                mb: '24px !important',
              }}
            >
              <Submit sx={{ width: 150 }} isLoading={edit.isLoading}>
                Add
              </Submit>
            </Box>
          </Stack>
        ) : (
          <>
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
          </>
        )}
      </Container>
    </Dialog>
  )
}

export default EditCategory
