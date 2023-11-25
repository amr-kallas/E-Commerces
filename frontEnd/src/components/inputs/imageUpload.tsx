import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Typography,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import UploadIcon from '@mui/icons-material/Upload'
import { ChangeEvent, useState } from 'react'
import ProductImgae from '../../features/product/components/AddForm/ProductImgae'
import { useTranslation } from 'react-i18next'

type imgHelpers = {
  name: string
  error: string | undefined
  multiple: boolean
  onUpload: (files: File | File[]) => void
  cancel: () => void
  url: string | undefined
  disabled: Boolean
  isProduct: Boolean
}
const ImageUpload = ({
  name,
  error,
  multiple,
  onUpload,
  cancel,
  url,
  disabled,
  isProduct = false,
}: imgHelpers) => {
  const {t}=useTranslation("category",{keyPrefix:"add"})
  const initialImage = url ? [url] : []
  const [upload, setUpload] = useState<string[]>(initialImage)
  const [uploadProduct, setUploadProduct] = useState<File[]>([])
  const handleSelectImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      onUpload(files.length == 1 ? e.target.files[0] : files)
      const fileURLs = files.map((file) => URL.createObjectURL(file))
      setUpload(fileURLs)
      setUploadProduct((prevFiles: any) => [...prevFiles, ...files])
    }
  }
  const cancelImg = () => {
    setUpload([])
    setUploadProduct([])
    cancel()
  }

  return (
    <FormControl>
      {!isProduct ? (
        upload.length == 0 ? (
          <Box
            component="label"
            htmlFor={name as string}
            sx={{
              border: error
                ? '1px solid #d32f2f'
                : '1px solid rgba(0, 0, 0, 0.23)',
              minHeight: '56px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderRadius: '12px',
              cursor: 'pointer',
              pointerEvents: disabled ? 'none' : 'unset',
              ':hover': {
                border: '1px solid #1976d2',
              },
            }}
          >
            <Typography color="#777">{t("image")}</Typography>
            <UploadIcon fontSize="small" color="primary" />
          </Box>
        ) : (
          <Box
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.23)',
              minHeight: '56px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderRadius: '12px',
              ':hover': {
                border: '1px solid #1976d2',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                'img:first-of-type': {
                  width: '100%',
                  flex: 1,
                },
                'img:not(:first-of-type)': {
                  width: '30%',
                  flex: 1,
                },
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                onClick={cancelImg}
              >
                <CancelIcon fontSize="small" color="error" />
              </IconButton>
              {upload.map((src, index) => (
                <img key={index} src={src} />
              ))}
            </Box>
          </Box>
        )
      ) : (
        <ProductImgae
          name={name}
          error={error}
          disabled={disabled}
          uploadProduct={uploadProduct}
          setUploadProduct={setUploadProduct}
        />
      )}
      <input
        type="file"
        disabled={!!disabled}
        multiple={multiple}
        onChange={handleSelectImg}
        id={name as string}
        hidden
      />
      <FormHelperText sx={{ color: 'error.main' }}>{error}</FormHelperText>
    </FormControl>
  )
}

export default ImageUpload
