import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import Progress from '@components/feedback/Progress'
import CancelIcon from '@mui/icons-material/Cancel'
import UploadIcon from '@mui/icons-material/Upload'
import { queries, keys } from '../api/queries'
import { useProgressContext } from '@context/ProgressContext'
import { ChangeEvent, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ImgProduct } from '../api/type'
type imgHelpers = {
  name: string
  error: string | undefined
  disabled: Boolean
  onUpload: (files: string[] | File | File[]) => void
  url: ImgProduct[] | undefined
  deletedImg: (id: string) => void
}
const ProductImage = ({
  name,
  error,
  disabled,
  onUpload,
  deletedImg,
  url,
}: imgHelpers) => {
  const initialImage = typeof url == 'string' ? [url] : url ?? []
  const [upload, setUpload] = useState(initialImage)
  const queryClient = useQueryClient()
  const [uploadProduct, setUploadProduct] = useState<File[]>([])
  const DeleteImg = queries.useDeleteImg()
  const { percentage, indexRef: ref, ids, setIds } = useProgressContext()
  const handleSelectImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      onUpload(files.length == 1 ? e.target.files[0] : files)
      setUploadProduct((prevFiles: any) => [...prevFiles, ...files])
    }
  }
  
  const handleDelete = (id: number) => {
    let imgID = ids[id]
    DeleteImg.mutate(imgID, {
      onSuccess: () => {
        setIds((prev) => prev.filter((item) => item != imgID))
        setUploadProduct((prev) => prev.filter((_item, index) => index != id))
        queryClient.invalidateQueries(keys.getAll._def)
      },
      onError: (error) => {
        console.log(error)
      },
    })
    if (ref && typeof ref === 'object' && typeof ref.current === 'number') {
      ref.current -= 1
    }
  }
  const handleDeleteImgEdit = (id: number) => {
    setUpload((prev) => prev.filter((item) => item.id != id))
    deletedImg(String(id))
  }
  return (
    <FormControl>
      <Box
        component="label"
        htmlFor={name as string}
        sx={{
          border: error ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
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
      <Stack spacing={3}>
        <Stack
          direction="row"
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            '@media(max-width:360px)': {
              justifyContent: 'center',
            },
          }}
        >
          {upload?.map((image: ImgProduct) => (
            <Stack
              spacing={1.5}
              key={image.id}
              direction="row"
              sx={{
                p: 0.5,
                flexWrap: 'wrap',
                m: '20px 0 0 !important',
                position: 'relative',
                flexBasis: '30%',
              }}
            >
              <Box sx={{ width: 1, height: 70 }}>
                <img
                  src={image.image}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '4px',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <IconButton
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '-5px',
                }}
                onClick={() => handleDeleteImgEdit(image.id)}
              >
                <CancelIcon fontSize="small" color="error" />
              </IconButton>
            </Stack>
          ))}
        </Stack>
        <Stack flex={1} display={uploadProduct.length == 0 ? 'none' : 'flex'}>
          {uploadProduct?.map((img, index) => (
            <Stack
              spacing={1.5}
              key={index}
              direction="row"
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                p: 0.5,
                flexWrap: 'wrap',
                m: '20px 0 0 !important',
                position: 'relative',
              }}
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
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 16 }}>{img.name}</Typography>
                <Typography sx={{ fontSize: 12 }}>
                  {img.size / 1024 < 1000
                    ? `${(img.size / 1024).toFixed(1)}KB`
                    : `${(img.size / (1024 * 1024)).toFixed(1)}MB`}
                </Typography>
              </Box>
              <Box width="100%" ml="2px !important">
                <Progress value={percentage[index]?.num ?? 0} />
              </Box>
              <IconButton
              disabled={!ids[index]}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '-5px',
                }}
                onClick={() => handleDelete(index)}
              >
                <CancelIcon fontSize="small" color={ids[index]?'error':'action'} />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <input
        type="file"
        accept="image/*"
        disabled={!!disabled}
        multiple
        onChange={handleSelectImg}
        id={name as string}
        hidden
      />
      <FormHelperText sx={{ color: 'error.main' }}>{error}</FormHelperText>
    </FormControl>
  )
}

export default ProductImage
