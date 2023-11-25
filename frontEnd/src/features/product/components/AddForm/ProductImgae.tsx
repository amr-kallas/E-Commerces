import { Box, FormControl, IconButton, Stack, Typography } from '@mui/material'
import Progress from '../../../../components/feedback/Progress'
import CancelIcon from '@mui/icons-material/Cancel'
import UploadIcon from '@mui/icons-material/Upload'
import { queries } from '../../api/queries'
import { useProgressContext } from '../../../../context/ProgressContext'
type imgHelpers = {
  name: string
  error: string | undefined
  disabled: Boolean
  uploadProduct: File[]
  setUploadProduct: React.Dispatch<React.SetStateAction<File[]>>
}
const ProductImgae = ({
  name,
  error,
  disabled,
  uploadProduct,
  setUploadProduct,
}: imgHelpers) => {
  const DeleteImg = queries.useDeleteImg()
  const { percentage, setPercentage, indexRef: ref } = useProgressContext()
  const handleDelete = (id: number) => {
    let imgID = percentage[id].id
    DeleteImg.mutate(imgID, {
      onSuccess: () => {
        setPercentage((prev) => prev.filter((item) => item.id != imgID))
        setUploadProduct((prev) => prev.filter((_item, index) => index != id))
      },
      onError: (error) => {
        console.log(error)
      },
    })
    if (ref && typeof ref === 'object' && typeof ref.current === 'number') {
      ref.current -= 1
    }
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
              sx={{
                position: 'absolute',
                right: 0,
                top: '-5px',
              }}
              onClick={() => handleDelete(index)}
            >
              <CancelIcon fontSize="small" color="error" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </FormControl>
  )
}

export default ProductImgae
