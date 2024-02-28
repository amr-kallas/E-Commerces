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
import useAddSearchParams from '@hooks/useAddSearchParams'
import { useForm } from 'react-hook-form'
import { keys, queries as productQuery } from '../../api/queries'
import TextField from '@components/inputs/TextField'
import Submit from '@components/buttons/Submit'
import { zodResolver } from '@hookform/resolvers/zod'
import schemaAddProduct, { defaultProductValue, dummyData } from './validation'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useProgressContext } from '@context/ProgressContext'
import { useTranslation } from 'react-i18next'
import { useSnackbarContext } from '@context/SnackbarContext'
import i18n from '@lib/i18n'
import ProductImage from '../ProductImage'
import useUploadImg from '../../hooks/useUploadImg'
const AddProduct = () => {
  const snackbar = useSnackbarContext()
  const { t } = useTranslation('product')
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
  const { data: categoryData } = productQuery.useAllCategories()
  const add = productQuery.useAdd()
  const edit = productQuery.useEdit()
  const queryClient = useQueryClient()
  const { isActive, clearSearchParams } = useAddSearchParams()
  const [sendReq, setSendReq] = useState(false)
  const [id, setId] = useState('')
  const { setPercentage, indexRef, setIds } = useProgressContext()
  const disabledInput = watch('category')
  const uploadImg = useUploadImg()
  const handleClose = () => {
    clearSearchParams()
    reset()
    setSendReq(false)
    setPercentage([])
    setIds([])
    setValue('image', undefined)
    indexRef.current = -1
  }
  const handleUploadImage = async (files: File | File[] | any) => {
    let imgs: File[]
    if (Array.from(files).length >= 1) {
      imgs = Array.from(files)
    } else {
      imgs = [files]
    }
    setValue('image', imgs)
    uploadImg({ imgs, id })
  }
  useEffect(() => {
    indexRef.current == -1 && setValue('image', undefined)
  }, [indexRef.current])

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
    edit.mutate(
      { id, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(keys.getAll._def)
          handleClose()
          snackbar({
            message: t('message.add'),
            severity: 'success',
          })
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
          {t('add.addProduct')}
        </DialogTitle>
        <Stack spacing={3} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              {t('add.category')}
            </InputLabel>
            <Select
              name="category"
              control={control}
              label="Category"
              message={i18n.t('validation:required')}
              onClick={sendCategory}
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
            label={t('add.title')}
            disabled={!disabledInput}
          />
          <TextField
            control={control}
            name="description"
            label={t('add.description')}
            disabled={!disabledInput}
          />
          <TextField
            control={control}
            name="price"
            label={t('add.price')}
            type="number"
            disabled={!disabledInput}
          />
          <TextField
            control={control}
            name="discount"
            label={t('add.discount')}
            type="number"
            disabled={!disabledInput}
          />
          <TextField
            control={control}
            name="About"
            label={t('add.about')}
            disabled={!disabledInput}
          />
          <ProductImage
            name="images"
            error={errors.image?.message}
            onUpload={handleUploadImage}
            disabled={!disabledInput}
            url={undefined}
            deletedImg={() => {}}
          />
          <Box
            sx={{
              textAlign: 'center',
              mt: 2,
              mb: '24px !important',
            }}
          >
            <Submit sx={{ width: 150 }} isLoading={edit.isLoading}>
              {t('add.add')}
            </Submit>
          </Box>
        </Stack>
      </Container>
    </Dialog>
  )
}

export default AddProduct
