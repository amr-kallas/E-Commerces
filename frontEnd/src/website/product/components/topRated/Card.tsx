import {
  Box,
  IconButton,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import { Product } from '@website/product/api/type'

const Card = ({ product }: { product: Product }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  return (
    <Stack
      direction={isSmallScreen ? 'column' : 'row'}
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        gap: 1.5,
        borderBottom: '1px solid #ddd',
      }}
    >
      <Box flex={1} width={1}>
        <img
          src={product.images[0].image}
          style={{
            width: '100%',
            borderRadius: 12,
            height: '150px',
            objectFit: 'cover',
            minWidth: '100px',
          }}
        />
      </Box>
      <Box flex={1} width={1}>
        <Typography variant="body1" fontWeight="bold">
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          mt={1}
          sx={{
            wordBreak: 'break-word',
          }}
        >
          {product.description}
        </Typography>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 1,
            mt: 3,
          }}
        >
          <Box>
            <Rating
              name="read-only"
              value={Number(product.rating)}
              readOnly
              precision={0.1}
              sx={{
                svg: {
                  width: 18,
                  height: 18,
                },
              }}
            />
            <Stack direction="row" spacing={1}>
              <Typography variant="body1" color="primary">
                {product.price}$
              </Typography>
              {product.discount != '0' && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#777',
                    textDecoration: 'line-through',
                  }}
                >
                  {product.discount}$
                </Typography>
              )}
            </Stack>
          </Box>
          <IconButton color="primary">
            <LocalGroceryStoreOutlinedIcon />
          </IconButton>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Card
