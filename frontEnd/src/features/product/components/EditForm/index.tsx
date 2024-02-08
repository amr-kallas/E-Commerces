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
import { useEffect, useState } from 'react'
import { productDetails } from './helpers'
import { useQueryClient } from '@tanstack/react-query'
import ProductImage from '../../ProductImage'
import { useProgressContext } from '../../../../context/ProgressContext'
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
  const { setPercentage, indexRef, setIds } = useProgressContext()
  const addImg = productQuery.useAddImg()
  const DeleteImg = productQuery.useDeleteImg()
  const [deletedImg, setDeletedImg] = useState<number[]>([])
  const imgsURL = productData?.[0].images.map((img) => {
    return img.image
  })
  const handleUploadImage = async (files: File | File[] | any) => {
    console.log(' edit')
    let imgs: File[]
    if (Array.from(files).length >= 1) {
      imgs = Array.from(files)
    } else {
      imgs = [files]
    }
    let c = 0
    for (const [index, element] of imgs.entries()) {
      if (index == c) {
        indexRef.current++
        c++
      }
      const changePercentageAtIndex = (newValue: number) => {
        setPercentage((oldArray: any) => {
          const newArray = [...oldArray]
          newArray[indexRef.current] = { num: newValue }
          return newArray
        })
      }
      setValue('images', imgs)
      const currentBody = {
        image: element,
        product_id: id,
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (files.length != 0) {
        await addImg.mutateAsync(
          { body: currentBody, changePercentageAtIndex },
          {
            onSuccess: (data) => {
              console.log({ data })
              setIds((prev) => [...prev, data.id])
              queryClient.invalidateQueries(keys.getAll._def)
            },
            onError: (error) => {
              console.log(error)
            },
          }
        )
      }
    }
  }
  const handleEditImg = (id: number) => {
    setDeletedImg((prev) => [...prev, id])
  }
  const disabledInput = watch('category')
  const handleClose = () => {
    setDeletedImg([])
    clearSearchParams()
  }

  useEffect(() => {
    if (productData) reset(productDetails(productData[0]))
  }, [productData, id])
  useEffect(() => {
    if (deletedImg.length == productData?.[0].images.length) {
      setValue('images', [])
    }
  }, [productData, deletedImg])
  const onSubmit = (body: any) => {
    deletedImg.forEach((id) => {
      DeleteImg.mutateAsync(String(id), {
        onSuccess: () => {
          queryClient.invalidateQueries(keys.getAll._def)
        },
        onError: (error) => {
          console.log(error)
        },
      })
    })

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
          <ProductImage
            key={imgsURL?.join()}
            name="images"
            error={errors.images?.message}
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
