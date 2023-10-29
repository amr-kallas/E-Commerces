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
import { keys, queries } from '../api/queries'
import useEventSearchParams from '../../../hooks/useEventSearchParams'
import Skeletons from './Skeletons'
import { useQueryClient } from '@tanstack/react-query'
import NoData from '../../../components/feedback/NoData'

type user = {
  id: string
  name: string
  email: string
  role: number
}

export const UserTable = () => {
  const { edit } = useEventSearchParams()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const { data, isLoading, isSuccess } = queries.useUsers()
  const noData = data?.length <= 1 && isSuccess
  const me = queries.useMe()
  const remove = queries.useDelete()
  const queryClient = useQueryClient()
  const handleDelete = (id: string) => {
    remove.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.users._def)
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="center">UserName</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && me.isLoading && (
              <>
                <Skeletons />
                <Skeletons />
                <Skeletons />
                <Skeletons />
              </>
            )}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell align="center">{me.data?.name + ' (You)'}</TableCell>
              <TableCell align="center">{me.data?.email}</TableCell>
              <TableCell align="center">
                {me.data?.role == 1995
                  ? 'Admin'
                  : me.data?.role == 1999
                  ? 'Product'
                  : me.data?.role == 2001
                  ? 'User'
                  : 'Writter'}
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'center',
                  }}
                >
                  <IconButton onClick={() => edit(me.data?.id)}>
                    <EditIcon sx={{ color: '#1976d2' }} />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>

            {data?.map((item: user, index: 1) => (
              <TableRow key={item.id}>
                {item.id != me.data.id && (
                  <>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">
                      {item.role == 1995
                        ? 'Admin'
                        : item.role == 1999
                        ? 'Product'
                        : item.role == 2001
                        ? 'User'
                        : 'Writter'}
                    </TableCell>
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
                        {item.id != me.data.id && (
                          <IconButton onClick={() => handleDelete(item.id)}>
                            <DeleteIcon sx={{ color: 'red' }} />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {noData && <NoData />}

      <TableContainer component={Paper}>
        <Table>
          <TableFooter>
            <TableRow>
              <PaginationTable
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
                setRowsPerPage={setRowsPerPage}
                rows={data?.length ?? 0}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
