import TableHeader from './TableHeader'
import Tables from '../../../components/table/Table'
import { Box, IconButton, TableCell, TableRow } from '@mui/material'
import { keys, queries } from '../api/queries'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import useEventSearchParams from '../../../hooks/useEventSearchParams'
import { useQueryClient } from '@tanstack/react-query'
import NoData from '../../../components/feedback/NoData'
import { categoryBody } from '../api/type'
const TableCategory = () => {
  const { edit } = useEventSearchParams()
  const useAll = queries.useAll()
  const useDelete = queries.useDelete()
  const queryClient = useQueryClient()
  const reversedData = Array.isArray(useAll.data)
    ? [...useAll.data].reverse()
    : []
  const tableHeader = TableHeader()
  const handleDelete = (id: string) => {
    useDelete.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(keys.getAll._def)
      },
      onError: (error) => {
        console.log(error)
      },
    })
  }
  return (
    <>
      <Tables header={tableHeader} skeleton={useAll.isLoading}>
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
      {useAll.data?.length == 0 && <NoData message="No Category Found" />}
    </>
  )
}

export default TableCategory
