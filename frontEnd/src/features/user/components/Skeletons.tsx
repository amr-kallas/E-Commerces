import { TableCell, TableRow } from '@mui/material'
import { Skeleton } from '../../../components/feedback/Skeleton'

const Skeletons = () => {
  return (
    <TableRow>
      <TableCell padding="normal">
        <Skeleton
          widthRange={{ min: 20, max: 40 }}
          sx={{ fontSize: '1.5rem' }}
        />
      </TableCell>
      <TableCell align="right">
        <Skeleton widthRange={{ min: 20, max: 40 }} sx={{ margin: 'auto' }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton widthRange={{ min: 20, max: 40 }} sx={{ margin: 'auto' }} />
      </TableCell>
      <TableCell align="center">
        <Skeleton widthRange={{ min: 20, max: 40 }} sx={{ margin: 'auto' }} />
      </TableCell>
    </TableRow>
  )
}

export default Skeletons
