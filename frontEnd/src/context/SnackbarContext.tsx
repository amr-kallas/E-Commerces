import { createContext, useContext } from 'react'
export type AlertSeverity = 'success' | 'error'
export type snackbarProps = {
  message: string
  severity: AlertSeverity
}
export type snackbar = {
  snackbarProps: snackbarProps
  setSnackbarProps: React.Dispatch<React.SetStateAction<snackbarProps>>
  handleOpenSnackbar: () => void
}
const defaultValues: snackbar = {
  snackbarProps: {
    message: '',
    severity: 'success',
  },
  setSnackbarProps: () => {},
  handleOpenSnackbar: () => {},
}
const SnackbarContext = createContext<snackbar>(defaultValues)

export const useSnackbarContext = () => {
  const { setSnackbarProps, handleOpenSnackbar } = useContext(SnackbarContext)
  const showSnackbar = (props: snackbarProps) => {
    setSnackbarProps(props)
    handleOpenSnackbar()
  }
  return showSnackbar
}

export default SnackbarContext
