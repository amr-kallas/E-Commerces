import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Box, Rating, Stack } from '@mui/material'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import { Product } from '../api/type'

const ProductCard = ({product}:{product:Product}) => {
  return (
    <Card>
      <CardMedia component="img" height="194" image={product.images[0].image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ borderTop: '1px solid #ddd' }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: 1,
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
              <Typography
                variant="body2"
                sx={{
                  color: '#777',
                  textDecoration: 'line-through',
                }}
              >
                {product.discount}$
              </Typography>
            </Stack>
          </Box>
          <IconButton color="primary">
            <LocalGroceryStoreOutlinedIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  )
}
export default ProductCard
