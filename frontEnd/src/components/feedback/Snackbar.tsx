import { Alert, Slide, Snackbar as Snack } from '@mui/material'
import { AlertSeverity } from '@context/SnackbarContext'
type snackbar = {
  severity: AlertSeverity
  message: string
  open: boolean
  handleClose: () => void
}
const Snackbar = ({ severity, message, open, handleClose }: snackbar) => {
  return (
    <Snack
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={Slide}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snack>
  )
}

export default Snackbar
