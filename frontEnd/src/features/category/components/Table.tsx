import TableHeader from './TableHeader'
import Tables from '../../../components/table/Table'
import { Box, IconButton, Paper, Table, TableCell, TableContainer, TableFooter, TableRow } from '@mui/material'
import { keys, queries } from '../api/queries'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import useEventSearchParams from '../../../hooks/useEventSearchParams'
import { useQueryClient } from '@tanstack/react-query'
import NoData from '../../../components/feedback/NoData'
import { categoryBody } from '../api/type'
import { useTranslation } from 'react-i18next'
import { useSnackbarContext } from '../../../context/SnackbarContext'
import { useState } from 'react'
import PaginationTable from '../../../components/table/PaginationTable'
const TableCategory = () => {
  const { t } = useTranslation('category')
  const snackbar = useSnackbarContext()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const { edit } = useEventSearchParams()
  const {data,isLoading} = queries.useAll({
    limit: rowsPerPage,
    page: page + 1,
  })
  console.log(data)
  const useDelete = queries.useDelete()
  const queryClient = useQueryClient()
  const reversedData = Array.isArray(data)
    ? [...data].reverse()
    : []
  const tableHeader = TableHeader()
  const handleDelete = (id: string) => {
    useDelete.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getAll._def)
        snackbar({
          message: t('message.remove'),
          severity: 'success',
        })
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }
  return (
    <>
      <Tables header={tableHeader} skeleton={isLoading}>
        {reversedData.map((item: categoryBody, index: number) => (
          <TableRow key={item.id}>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell
              align="center"
              sx={{ width: 300, wordBreak: 'break-all' }}
            >
              {item.title}
            </TableCell>
            <TableCell>
              <Box sx={{ width: 30, height: 30, m: 'auto' }}>
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '30px',
                  }}
                  src={item.image}
                />
              </Box>
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
                <IconButton onClick={() => handleDelete(item.id)}>
                  <DeleteIcon sx={{ color: 'red' }} />
                </IconButton>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </Tables>
      {data?.length == 0 && <NoData message={t("message.data")} />}
      <TableContainer component={Paper}>
        <Table>
          <TableFooter>
            <TableRow>
              <PaginationTable
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={data?.data?.total ?? 0}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}

export default TableCategory
