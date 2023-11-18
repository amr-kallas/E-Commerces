import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import UploadIcon from '@mui/icons-material/Upload'
import { ChangeEvent, useState } from 'react'
import Progress from '../feedback/Progress'
import { useProgressContext } from '../../context/ProgressContext'
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
  const initialImage = url ? [url] : []
  const [upload, setUpload] = useState<string[]>(initialImage)
  const [uploadProduct, setUploadProduct] = useState<File[]>()
  const {progressPercentage}=useProgressContext()
  console.log(progressPercentage)
  const handleSelectImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      onUpload(files.length==1?e.target.files[0]:files)
      const fileURLs = files.map((file) => URL.createObjectURL(file))
      setUpload(fileURLs)
      setUploadProduct(files)
    }
  }
  const cancelImg = () => {
    setUpload([])
    setUploadProduct(undefined)
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
            <Typography color="#777">img</Typography>
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
        <FormControl>
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
            <Typography color="#777">img</Typography>
            <UploadIcon fontSize="small" color="primary" />
          </Box>
          <Stack  spacing={3}>
            {uploadProduct?.map((img, index) => (
              <Stack
                spacing={1.5}
                key={index}
                direction="row"
                sx={{ border: '1px solid rgba(0, 0, 0, 0.3)', p: 0.5 ,flexWrap:'wrap',m:'20px 0 0 !important'}}
              >
                <Box sx={{ width: 70, height: 70 }}>
                  <img
                    src={URL.createObjectURL(img)}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '4px',
                    }}
                  />
                </Box>
                <Box sx={{flex:1}}>
                  <Typography sx={{ fontSize: 16 }}>{img.name}</Typography>
                  <Typography sx={{ fontSize: 12 }}>
                    {img.size / 1024 < 1000
                      ? `${(img.size / 1024).toFixed(1)}KB`
                      : `${(img.size / (1024 * 1024)).toFixed(1)}MB`}
                  </Typography>
                </Box>
                <Box width="100%" ml='2px !important' ref={(e:any)=>console.log(e)}>
                  <Progress value={50} ref={(e:never)=>console.log(e)} />
                </Box>
              </Stack>
            ))}
          </Stack>
        </FormControl>
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
