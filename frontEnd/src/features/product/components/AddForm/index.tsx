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
  Stack,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import useAddSearchParams from '../../../../hooks/useAddSearchParams'
import { Controller, useForm } from 'react-hook-form'
import { queries as categoryQuery } from '../../../category/api/queries'
import { keys, queries as productQuery } from '../../api/queries'
import NameInput from '../../../auth/components/NameInput'
import Submit from '../../../../components/buttons/Submit'
import { zodResolver } from '@hookform/resolvers/zod'
import schemaAddProduct, { defaultProductValue } from './validation'
import { useQueryClient } from '@tanstack/react-query'
import ImageUpload from '../../../../components/inputs/imageUpload'
const AddProduct = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: defaultProductValue,
    resolver: zodResolver(schemaAddProduct),
  })
  const { data: categoryData } = categoryQuery.useAll()
  const add = productQuery.useAdd()
  const queryClient = useQueryClient()
  const { isActive, clearSearchParams } = useAddSearchParams()
  const handleClose = () => {
    clearSearchParams()
    reset()
  }
  const handleUploadImage = (files: File | File[] | any) => {
    setValue('images', files)
  }
  const handleCancelImage = () => {
    setValue('images', [])
  }

  const onSubmit = (data: any) => {
    add.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getAll._def)
        handleClose()
      },
      onError: (error) => {
        console.log(error)
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
          Add Product
        </DialogTitle>
        <Stack spacing={3} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    {...field}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Category"
                    error={!!error}
                  >
                    {categoryData?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText error>
                    {error ? 'Required' : ''}
                  </FormHelperText>
                </>
              )}
            />
          </FormControl>
          <NameInput control={control} name="title" />
          <NameInput control={control} name="description" />
          <NameInput control={control} name="price" type="number" />
          <NameInput control={control} name="discount" type="number" />
          <NameInput control={control} name="About" />
          <ImageUpload
            name="images"
            error={errors.images?.message}
            multiple
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

export default AddProduct
