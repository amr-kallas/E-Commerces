import { TablePagination } from '@mui/material'
import React from 'react'
import { TablePaginationActions } from './PaginationAction'
type paginationPage={
    page:number,
    rowsPerPage:number,
    setPage:React.Dispatch<React.SetStateAction<number>>,
    setRowsPerPage:React.Dispatch<React.SetStateAction<number>>
    rows:number
}
const PaginationTable = ({page,rowsPerPage,setPage,setRowsPerPage,rows}:paginationPage) => {
    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        setPage(newPage);
      };
      
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
  return (
    <TablePagination
    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
    colSpan={3}
    count={rows}
    rowsPerPage={rowsPerPage}
    page={page}
    SelectProps={{
      inputProps: {
        'aria-label': 'rows per page',
      },
      native: true,
    }}
    onPageChange={handleChangePage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    ActionsComponent={TablePaginationActions}
  />
  )
}

export default PaginationTable