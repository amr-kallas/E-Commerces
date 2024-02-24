import {
  Box,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
} from '@mui/material'
import Tables from '../../../components/table/Table'
import TableHeader from './TableHeader'
import { keys, queries } from '../api/queries'
import useEventSearchParams from '../../../hooks/useEventSearchParams'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useQueryClient } from '@tanstack/react-query'
import NoData from '../../../components/feedback/NoData'
import { useTranslation } from 'react-i18next'
import { useSnackbarContext } from '../../../context/SnackbarContext'
import PaginationTable from '../../../components/table/PaginationTable'
import { useState } from 'react'
import useQuerySearchParams from '../../../hooks/useQuerySeachParams'
import Search from '../../../components/inputs/Search'
const ProductTable = () => {
  const { t } = useTranslation('product')
  const { q } = useQuerySearchParams()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(3)
  const snackbar = useSnackbarContext()
  const tableHeader = TableHeader()
  const { edit } = useEventSearchParams()
  const { data, isLoading } = queries.useAll({
    limit: rowsPerPage,
    page: page + 1,
  })
  const Delete = queries.useDelete()
  const { data: SearchData } = queries.useSearch(q)
  const productData = q != '' ? SearchData : data?.data ?? []
  const queryClient = useQueryClient()
  const handleDelete = (id: string) => {
    Delete.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getAll._def)
        snackbar({
          message: t('message.remove'),
          severity: 'success',
        })
      },
      onError: () => {
        snackbar({
          message: t('message.error'),
          severity: 'error',
        })
      },
    })
  }
  return (
    <>
      <Search />
      <Tables header={tableHeader} skeleton={isLoading}>
        {data?.data?.map((item: any, index: number) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell align="center">{item.title}</TableCell>
            <TableCell
              align="center"
              sx={{
                overflow: 'hidden',
                maxHeight: '4em',
              }}
            >
              <span
                style={{
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  overflow: 'hidden',
                  direction: 'ltr',
                }}
              >
                {item.description}
              </span>
            </TableCell>
            <TableCell align="center">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  width: 120,
                  m: 'auto',
                  'img:not(:first-of-type)': {
                    marginLeft: '-10px',
                  },
                  '::before': {
                    content: `"${
                      item.images.length > 3 ? `+${item.images.length - 3}` : ''
                    }"`,
                    width: '35px',
                    height: '35px',
                    background: 'rgba(0 0 0 /40%)',
                    borderRadius: ' 50%',
                    position: 'absolute',
                    right: '15%',
                    color: 'white',
                    display: item.images.length > 3 ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '15px',
                  },
                }}
              >
                {item.images.slice(0, 3).map((imgs: any) => (
                  <img
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                    src={imgs.image}
                    alt=""
                    key={imgs.id}
                  />
                ))}
              </Box>
            </TableCell>
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
      {data?.data?.length == 0 && <NoData message={t('message.data')} />}
      <TableContainer component={Paper}>
        <Table>
          <TableFooter>
            <TableRow>
              <PaginationTable
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                rows={data?.total ?? 0}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}

export default ProductTable
