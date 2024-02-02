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
import Select from '../../../../components/inputs/Select'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { queries as categoryQuery } from '../../../category/api/queries'
import { keys, queries as productQuery } from '../../api/queries'
import TextField from '../../../../components/inputs/TextField'
import Submit from '../../../../components/buttons/Submit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useSnackbarContext } from '../../../../context/SnackbarContext'
import i18n from '../../../../lib/i18n'
import useEditSearchParams from '../../../../hooks/useEditSearchParams'
import { defaultProductValue, product, schemaEditProduct } from './validation'
import { useEffect } from 'react'
import { productDetails } from './helpers'
import { useQueryClient } from '@tanstack/react-query'
import ImageUpload from '../../../../components/inputs/imageUpload'
const EditProduct = () => {
  const { id, isActive, clearSearchParams } = useEditSearchParams()
  const snackbar = useSnackbarContext()
  const { data: productData, isSuccess } = productQuery.useProduct(id)
  const { data: categoryData } = categoryQuery.useAll()
  const edit = productQuery.useEdit()
  const queryClient = useQueryClient()
  const { t } = useTranslation('product')
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<product>({
    defaultValues: isSuccess
      ? productDetails(productData[0])
      : defaultProductValue,
    resolver: zodResolver(schemaEditProduct),
  })
  const imgsURL = productData?.[0].images.map((img) => {
    return img.image
  })
  const handleUploadImage = (files: string[] | File | File[]) => {
    setValue('images', files)
  }

  const handleCancelImage = () => {
    setValue('images', [])
  }
  const disabledInput = watch('category')
  const handleClose = () => {
    clearSearchParams()
  }

  useEffect(() => {
    if (productData) reset(productDetails(productData[0]))
  }, [productData, id])

  const onSubmit = (body: any) => {
    edit.mutate(
      { id, body },
      {
        onSuccess: () => {
          snackbar({ message: t('message.edit'), severity: 'success' })
          queryClient.invalidateQueries(keys.getAll._def)
          handleClose()
        },
        onError: () => {
          snackbar({ message: t('message.error'), severity: 'error' })
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
          {t('edit.editProduct')}
        </DialogTitle>
        <Stack spacing={3} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t('edit.category')}
            </InputLabel>
            <Select
              name="category"
              control={control}
              label="Category"
              message={i18n.t('validation:required')}
            >
              {categoryData?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            control={control}
            name="title"
            label={t('edit.title')}
            disabled={!disabledInput}
          />
          <TextField
            control={control}
            name="description"
            label={t('edit.description')}
            disabled={!disabledInput}
          />
          <TextField
            control={control}
            name="price"
            label={t('edit.price')}
            type="number"
            disabled={!disabledInput}
          />
          <TextField
            control={control}
            name="discount"
            label={t('edit.discount')}
            type="number"
            disabled={!disabledInput}
          />
          <TextField
            control={control}
            name="About"
            label={t('edit.about')}
            disabled={!disabledInput}
          />
          <ImageUpload
            key={imgsURL?.join()}
            name="images"
            error={errors.images?.message}
            multiple
            onUpload={handleUploadImage}
            cancel={handleCancelImage}
            url={imgsURL}
            disabled={!disabledInput}
            isProduct={false}
          />
          <Box
            sx={{
              textAlign: 'center',
              mt: 2,
              mb: '24px !important',
            }}
          >
            <Submit sx={{ width: 150 }} isLoading={edit.isLoading}>
              {t('edit.edit')}
            </Submit>
          </Box>
        </Stack>
      </Container>
    </Dialog>
  )
}

export default EditProduct
