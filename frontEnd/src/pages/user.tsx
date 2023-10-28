import { Box, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { EditForm, UserTable } from '../features/user'
import TopBarSlider from '../components/feedback/TopBarSlider'
import useEventSearchParams from '../hooks/useEventSearchParams'
import AddForm from '../features/user/components/AddForm'

const User = () => {
  const { add } = useEventSearchParams()
  return (
    <Box>
      <TopBarSlider />
      <UserTable />
      <EditForm />
      <AddForm />
      <Box sx={{ position: 'fixed', right: 30, bottom: 30 }} onClick={add}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Box>
  )
}

export default User
