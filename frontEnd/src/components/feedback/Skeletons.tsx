import { TableCell, TableRow } from '@mui/material'
import { Skeleton } from './Skeleton'

const Skeletons = ({ max }: { max: string[] }) => {
  const length = max.map((title, index) => (
    <TableCell key={index} padding="normal" align='center'>
      <Skeleton widthRange={{ min: 20, max: 40 }} sx={{ fontSize: '1.5rem',mx:title=='id'?'unset':'auto' }} />
    </TableCell>
  ))
  return <TableRow>{length}</TableRow>
}

export default Skeletons
