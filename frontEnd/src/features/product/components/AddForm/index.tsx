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
import schemaAddProduct, {
  defaultProductValue,
  dummyData,
  body,
} from './validation'
import { useQueryClient } from '@tanstack/react-query'
import ImageUpload from '../../../../components/inputs/imageUpload'
import { useEffect, useState } from 'react'
import { useProgressContext } from '../../../../context/ProgressContext'
import { useTranslation } from 'react-i18next'
import { useSnackbarContext } from '../../../../context/SnackbarContext'
import i18n from '../../../../lib/i18n'
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
  const { data: categoryData } = categoryQuery.useAll()
  const add = productQuery.useAdd()
  const addImg = productQuery.useAddImg()
  const edit = productQuery.useEdit()
  const queryClient = useQueryClient()
  const { isActive, clearSearchParams } = useAddSearchParams()
  const [sendReq, setSendReq] = useState(false)
  const [id, setId] = useState('')
  const { setPercentage, indexRef } = useProgressContext()
  const disabledInput = watch('category')
  const handleClose = () => {
    clearSearchParams()
    reset()
    setSendReq(false)
    setPercentage([])
    indexRef.current = -1
  }
  const handleUploadImage = async (files: File | File[] | any) => {
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
          newArray[indexRef.current] = { id: '1f', num: newValue }
          return newArray
        })
      }
      setValue('image', element)
      body.image = element
      body.product_id = id
      if (files.length != 0)
        await addImg.mutateAsync(
          { body, changePercentageAtIndex },
          {
            onSuccess: (data) => {
              setPercentage((oldArray: any) => {
                const newArray = [...oldArray]
                newArray[indexRef.current] = {
                  ...oldArray[indexRef.current],
                  id: data.id,
                }
                return newArray
              })
            },
            onError: (error) => {
              console.log(error)
            },
          }
        )
    }
  }
  const handleCancelImage = () => {
    setValue('image', undefined)
    setPercentage([])
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
                    {error ? i18n.t("validation:required") : ''}
                  </FormHelperText>
                </>
              )}
            />
          </FormControl>
          <NameInput
            control={control}
            name="title"
            label={t('add.title')}
            disabled={!disabledInput}
          />
          <NameInput
            control={control}
            name="description"
            label={t('add.description')}
            disabled={!disabledInput}
          />
          <NameInput
            control={control}
            name="price"
            label={t('add.price')}
            type="number"
            disabled={!disabledInput}
          />
          <NameInput
            control={control}
            name="discount"
            label={t('add.discount')}
            type="number"
            disabled={!disabledInput}
          />
          <NameInput
            control={control}
            name="About"
            label={t('add.about')}
            disabled={!disabledInput}
          />
          <ImageUpload
            name="images"
            error={errors.image?.message}
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
