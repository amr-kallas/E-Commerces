import { TablePagination } from '@mui/material'
import React from 'react'
import { TablePaginationActions } from './PaginationAction'
import { useTranslation } from 'react-i18next'
type paginationPage = {
  page: number
  rowsPerPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>
  rows: number
}
const PaginationTable = ({
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  rows,
}: paginationPage) => {
  const {t}=useTranslation("user",{keyPrefix:"table"})
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
      colSpan={3}
      count={rows}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: {
          'aria-label': 'rows per pageسس',
        },
        native: true,
      }}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={TablePaginationActions}
      labelRowsPerPage={t("rows")}
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t("of")} ${count}`}

    />
  )
}

export default PaginationTable
