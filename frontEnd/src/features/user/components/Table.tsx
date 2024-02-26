import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import PaginationTable from '@components/table/PaginationTable'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { keys, queries } from '../api/queries'
import useEventSearchParams from '@hooks/useEventSearchParams'
import { useQueryClient } from '@tanstack/react-query'
import HeaderTable from './HeaderTable'
import Tables from '@components/table/Table'
import { User } from '../api/type'
import { useSnackbarContext } from '@context/SnackbarContext'
import { useTranslation } from 'react-i18next'
import Search from '@components/inputs/Search'
import useQuerySearchParams from '@hooks/useQuerySeachParams'
import SearchDate from '@components/inputs/SearchDate'

export const UserTable = () => {
  const snackbar = useSnackbarContext()
  const { q, date } = useQuerySearchParams()
  const tableHeader = HeaderTable()
  const { t } = useTranslation('user')
  const { edit } = useEventSearchParams()
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const { data, isLoading } = queries.useUsers({
    limit: rowsPerPage,
    page: page + 1,
  })
  const { data: SearchData } = queries.useSearch(q)
  const filterdDataByDate = data?.data.filter(
    (item) => item.created_at?.split('T')[0] == date
  )
  const filterdDataByDate_Search = filterdDataByDate?.filter((item) =>
    SearchData?.some((item2) => item2.id == item.id)
  )
  const userData =
    q && date
      ? filterdDataByDate_Search
      : q
      ? SearchData
      : date
      ? filterdDataByDate
      : data?.data ?? []
  const me = queries.useMe()
  const remove = queries.useDelete()
  const queryClient = useQueryClient()
  let index = 2
  useEffect(() => {
    if (data?.total) setTotal(data.total)
  }, [data?.total])
  const handleDelete = (id: string) => {
    remove.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.users._def)
        snackbar({
          message: t('message.remove'),
          severity: 'success',
        })
      },
      onError: (err) => {
        console.log(err)
      },
    })
  }
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Search />
        <SearchDate />
      </Stack>
      <Tables header={tableHeader} skeleton={isLoading && me.isLoading}>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell align="center">{me.data?.name + ' (You)'}</TableCell>
          <TableCell align="center">{me.data?.email}</TableCell>
          <TableCell align="center">
            {me.data?.created_at.split('T')[0]}
          </TableCell>
          <TableCell align="center">
            {me.data?.updated_at.split('T')[0]}
          </TableCell>
          <TableCell align="center">
            {me.data?.role == '1995'
              ? 'Admin'
              : me.data?.role == '1999'
              ? 'Product'
              : me.data?.role == '2001'
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
              <IconButton onClick={() => edit(me.data!.id)}>
                <EditIcon sx={{ color: '#1976d2' }} />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>

        {userData?.map((item: User) => (
          <TableRow key={item.id}>
            {item.id != me.data?.id && (
              <>
                <TableCell>{index++}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.email}</TableCell>
                <TableCell align="center">
                  {item.created_at?.split('T')[0]}
                </TableCell>
                <TableCell align="center">
                  {item.updated_at?.split('T')[0]}
                </TableCell>
                <TableCell align="center">
                  {item.role == '1995'
                    ? 'Admin'
                    : item.role == '1999'
                    ? 'Product'
                    : item.role == '2001'
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
                    {item.id != me.data?.id && (
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
      </Tables>
      <TableContainer component={Paper}>
        <Table>
          <TableFooter>
            <TableRow>
              <PaginationTable
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={total ?? 0}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
