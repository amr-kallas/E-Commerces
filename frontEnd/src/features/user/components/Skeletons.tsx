import { Skeleton, TableCell, TableRow } from '@mui/material'
const skeletonStyle = {
  fontSize: '2rem',
  width: 80,
  margin: 'auto',
}
const Skeletons = () => {
  return (
    <TableRow>
      <TableCell padding="normal">
        <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: 25 }} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" sx={skeletonStyle} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" sx={skeletonStyle} />
      </TableCell>
      <TableCell align="center">
        <Skeleton variant="text" sx={skeletonStyle} />
      </TableCell>
    </TableRow>
  )
}

export default Skeletons
