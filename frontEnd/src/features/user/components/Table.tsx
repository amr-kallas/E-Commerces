import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material'
import { useState } from 'react'
import PaginationTable from './PaginationTable'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { queries } from '../api/queries'
import useEventSearchParams from '../../../hooks/useEventSearchParams'

type user = {
  id: string
  name: string
  email: string
}
export const UserTable = () => {
  const {edit}=useEventSearchParams()
 
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { data, isLoading } = queries.useUsers()
  if (isLoading) return
  const handleDelete=(_id: string)=> {
   
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="center">UserName</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item: user, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.email}</TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'center',
                  }}
                >
                  <IconButton onClick={()=>edit(item.id)}>
                    <EditIcon sx={{color:'#1976d2'}} />
                  </IconButton>
                  <IconButton onClick={()=>handleDelete(item.id)}>
                    <DeleteIcon  sx={{color:'red'}} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <PaginationTable
              page={page}
              rowsPerPage={rowsPerPage}
              setPage={setPage}
              setRowsPerPage={setRowsPerPage}
              rows={data.length}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
