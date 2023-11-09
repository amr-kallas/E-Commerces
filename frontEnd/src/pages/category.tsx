import { Box, Fab } from '@mui/material'
import TableCategory from '../features/category/components/Table'
import AddIcon from '@mui/icons-material/Add'
import useEventSearchParams from '../hooks/useEventSearchParams'
import { AddCategory,EditCategory } from '../features/category'

const Category = () => {
  const { add } = useEventSearchParams()
  return (
    <Box>
      <AddCategory />
      <EditCategory />
      <TableCategory />
      <Box sx={{ position: 'fixed', right: 30, bottom: 30 }} onClick={add}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}

export default Category
