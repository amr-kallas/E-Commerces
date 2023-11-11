import { Box, Fab } from '@mui/material'
import Table from '../features/product/Table'
import AddIcon from '@mui/icons-material/Add'
import useEventSearchParams from '../hooks/useEventSearchParams'
import AddProduct from '../features/product/components/AddForm'

const Product = () => {
  const { add } = useEventSearchParams()
  return (
    <Box>
      <Table />
      <AddProduct />
      <Box sx={{ position: 'fixed', right: 30, bottom: 30 }} onClick={add}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}

export default Product
