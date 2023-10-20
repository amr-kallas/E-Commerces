import { Container, Dialog, DialogTitle, Stack } from '@mui/material'
import useEditSearchParams from '../../../hooks/useEditSearchParams'
import NameInput from '../../auth/components/NameInput'
import { useForm } from 'react-hook-form'

export const EditForm = () => {
  const { control, handleSubmit } = useForm()
  const { id, isActive, clear } = useEditSearchParams()
  console.log({ isActive })
  console.log({ id })
  const handleClose = () => {
    clear()
  }
  return (
    <Dialog open={isActive} onClose={handleClose} sx={{
    '.MuiDialog-paper':{
      width:1,
      height:300
    }
    }}>
      <Container>
        <DialogTitle>Edit User</DialogTitle>
        <Stack spacing={4}>
          <NameInput control={control} name="name" />
          <NameInput control={control} name="email" />
        </Stack>
      </Container>
    </Dialog>
  )
}
