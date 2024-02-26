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
import Select from '@components/inputs/Select'
import CloseIcon from '@mui/icons-material/Close'
import { useForm } from 'react-hook-form'
import { queries as categoryQuery } from '@features/category/api/queries'
import { keys, queries as productQuery } from '../../api/queries'
import TextField from '@components/inputs/TextField'
import Submit from '@components/buttons/Submit'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useSnackbarContext } from '@context/SnackbarContext'
import i18n from '@lib/i18n'
import useEditSearchParams from '@hooks/useEditSearchParams'
import { defaultProductValue, product, schemaEditProduct } from './validation'
import { useEffect, useRef, useState } from 'react'
import { productDetails } from './helpers'
import { useQueryClient } from '@tanstack/react-query'
import ProductImage from '../ProductImage'
import { useProgressContext } from '@context/ProgressContext'
import { useCancelImages } from '../../hooks/useCancelImg'
import useUploadImg from '../../hooks/useUploadImg'
const EditProduct = () => {
  const { id, isActive, clearSearchParams } = useEditSearchParams()
  const cancelImg = useCancelImages()
  const uploadImg = useUploadImg()
  const snackbar = useSnackbarContext()
  const { data: productData, isSuccess } = productQuery.useProduct(id)
  const { data: categoryData } = categoryQuery.useAll({ limit: 10, page: 1 })
  const edit = productQuery.useEdit()
  const queryClient = useQueryClient()
  const { t } = useTranslation('product')
  const { handleSubmit, control, watch, reset } = useForm<product>({
    defaultValues: isSuccess
      ? productDetails(productData[0])
      : defaultProductValue,
    resolver: zodResolver(schemaEditProduct),
  })
  const disabledInput = watch('category')
  const { setIds, ids } = useProgressContext()
  const DeleteImg = productQuery.useDeleteImg()
  const [deletedImg, setDeletedImg] = useState<string[]>([])
  const idsRef = useRef(ids)
  let uniqeKey = useRef(0)
  const isSend =
    deletedImg.length != productData?.[0].images.length || ids.length != 0
  const handleUploadImage = async (files: File | File[] | any) => {
    let imgs: File[]
    if (Array.from(files).length >= 1) {
      imgs = Array.from(files)
    } else {
      imgs = [files]
    }
    uploadImg({ imgs, id })
  }

  const handleEditImg = (id: string) => {
    setDeletedImg((prev) => [...prev, id])
  }

  const handleClose = () => {
    if (idsRef.current.length != 0) {
      cancelImg(ids)
    }
    setDeletedImg([])
    clearSearchParams()
    setIds([])
    uniqeKey.current = 0
  }
  useEffect(() => {
    uniqeKey.current += 1
    if (productData) reset(productDetails(productData[0]))
  }, [productData, id])

  useEffect(() => {
    idsRef.current = ids
  }, [ids])

  const onSubmit = (body: any) => {
    if (
      deletedImg.length != productData?.[0].images.length ||
      ids.length != 0
    ) {
      cancelImg(deletedImg)

      edit.mutate(
        { id, body },
        {
          onSuccess: () => {
            snackbar({ message: t('message.edit'), severity: 'success' })
            queryClient.invalidateQueries(keys.getAll._def)
            idsRef.current = []
            handleClose()
          },
          onError: () => {
            snackbar({ message: t('message.error'), severity: 'error' })
          },
        }
      )
    }
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
              {categoryData?.data?.map((item) => (
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
          <ProductImage
            key={`${productData?.[0].id}${uniqeKey.current}`}
            name="images"
            error={!isSend ? 'Required' : ''}
            disabled={!disabledInput}
            url={productData?.[0]?.images}
            onUpload={handleUploadImage}
            deletedImg={handleEditImg}
          />
          <Box
            sx={{
              textAlign: 'center',
              mt: 2,
              mb: '24px !important',
            }}
          >
            <Submit
              sx={{ width: 150 }}
              isLoading={edit.isLoading || DeleteImg.isLoading}
            >
              {t('edit.edit')}
            </Submit>
          </Box>
        </Stack>
      </Container>
    </Dialog>
  )
}

export default EditProduct
