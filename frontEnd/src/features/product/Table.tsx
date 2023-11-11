import { Box, IconButton, TableCell, TableRow } from '@mui/material'
import Tables from '../../components/table/Table'
import TableHeader from './TableHeader'
import { queries } from './api/queries'
import useEventSearchParams from '../../hooks/useEventSearchParams'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
const Table = () => {
  const tableHeader = TableHeader()
  const {edit}= useEventSearchParams()
  const { data, isLoading } = queries.useAll()
  const handleDelete=(id:string)=>{

  }
  return (
    <Tables header={tableHeader} skeleton={isLoading}>
      {data?.map((item: any, index: number) => (
        <TableRow key={item.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell align="center">{item.title}</TableCell>
          <TableCell align="center">{item.description}</TableCell>
          <TableCell align="center">{item.price}</TableCell>
          <TableCell align="center">{item.price}</TableCell>
          <TableCell align="center">
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                justifyContent: 'center',
              }}
            >
              <IconButton onClick={() => edit(item.id)}>
                <EditIcon sx={{ color: '#1976d2' }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(item.id)}>
                <DeleteIcon sx={{ color: 'red' }} />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </Tables>
  )
}

export default Table
