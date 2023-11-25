import React, { useState } from 'react'
import SnackbarContext, { snackbarProps } from '../context/SnackbarContext'
import Snackbar from '../components/feedback/Snackbar'

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [snackbarProps, setSnackbarProps] = useState<snackbarProps>({
    message: '',
    severity: 'success',
  })
  const handleOpenSnackbar = () => {
    setOpen(true)
  }
  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }
  return (
    <SnackbarContext.Provider
      value={{ snackbarProps, setSnackbarProps, handleOpenSnackbar }}
    >
      {children}
      <Snackbar
        severity={snackbarProps.severity}
        message={snackbarProps.message}
        open={open}
        handleClose={handleCloseSnackbar}
      />
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider
