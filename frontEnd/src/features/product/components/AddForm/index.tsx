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
import schemaAddProduct, { defaultProductValue, dummyData } from './validation'
import { useQueryClient } from '@tanstack/react-query'
import ImageUpload from '../../../../components/inputs/imageUpload'
import { useState } from 'react'
const AddProduct = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: defaultProductValue,
    resolver: zodResolver(schemaAddProduct),
  })
  const { data: categoryData } = categoryQuery.useAll()
  const add = productQuery.useAdd()
  const edit = productQuery.useEdit()
  const queryClient = useQueryClient()
  const { isActive, clearSearchParams } = useAddSearchParams()
  const [sendReq, setSendReq] = useState(false)
  const [id, setId] = useState('')
  const disabledInput = watch('category')
  const handleClose = () => {
    clearSearchParams()
    reset()
    setSendReq(false)
  }
  const handleUploadImage = (files: File | File[] | any) => {
    setValue('images', files)
  }
  const handleCancelImage = () => {
    setValue('images', [])
  }
  const sendCategory = () => {
    const categoryInput = watch('category')
    dummyData.category = categoryInput
    setSendReq(true)
    if (!sendReq) {
      add.mutate(dummyData, {
        onSuccess: (data) => {
          setId(data.id)
        },
      })
    }
  }
  const onSubmit = (body: any) => {
    edit.mutate({id,body}, {
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
                    onClick={sendCategory}
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
          <NameInput control={control} name="title" disabled={!disabledInput} />
          <NameInput
            control={control}
            name="description"
            disabled={!disabledInput}
          />
          <NameInput
            control={control}
            name="price"
            type="number"
            disabled={!disabledInput}
          />
          <NameInput
            control={control}
            name="discount"
            type="number"
            disabled={!disabledInput}
          />
          <NameInput control={control} name="About" disabled={!disabledInput} />
          <ImageUpload
            name="images"
            error={errors.images?.message}
            multiple
            onUpload={handleUploadImage}
            cancel={handleCancelImage}
            url={undefined}
            disabled={!disabledInput}
            isProduct={true}
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
