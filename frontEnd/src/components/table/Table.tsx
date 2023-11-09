import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Skeletons from '../feedback/Skeletons'
type tableProps = {
  header: string[]
  children: React.ReactNode
  skeleton: boolean
}
const Tables = ({ header, children, skeleton }: tableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((item) => (
              <TableCell key={item} align={item == 'id' ? 'inherit' : 'center'}>
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {skeleton && (
            <>
              {header.map((_, index) => (
                <Skeletons key={index} max={header} />
              ))}
            </>
          )}
        {children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Tables
