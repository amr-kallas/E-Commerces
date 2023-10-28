import { queries } from '../api/queries'
import { useNavigate } from 'react-router-dom'
import Storage from '../../../utils/storage'

const logout = () => {
  const logout = queries.useLogout()
  const navigate = useNavigate()
  const LogoutUser = () => {
    logout.mutateAsync()
    Storage.removeToken()
    navigate('/login')
  }
  return {LogoutUser}
}

export default logout
