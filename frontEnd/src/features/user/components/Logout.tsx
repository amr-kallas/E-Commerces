import { Button } from '@mui/material'
import { queries } from '../api/queries'
import { useNavigate } from 'react-router-dom'
import Storage from '../../../utils/storage'

const Logout = () => {
  // const logout = queries.useLogout()
  const navigate = useNavigate()
  const handleClick = () => {
    // logout.mutateAsync()
    // Storage.removeToken()
    // navigate('/login')
  }
  return (
    <Button variant="contained" onClick={handleClick}>
      Logout
    </Button>
  )
}

export default Logout
