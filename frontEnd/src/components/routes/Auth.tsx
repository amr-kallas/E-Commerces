import { queries } from '../../features/user/api/queries'
import Storage from '../../utils/storage'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
  const { isError } = queries.useUser()
  const token = Storage.getToken()

  if (token) {
    if (!isError) {
      return <Outlet />
    } else {
      Storage.removeToken()
      return <Navigate to="/login" />
    }
  }
  return <Navigate to="/login" />
}

export default Auth
