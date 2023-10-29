import { queries } from '../../features/user/api/queries'
import Storage from '../../utils/storage'
import { Navigate, Outlet } from 'react-router-dom'
import SomethingWentWrong from '../feedback/SomethingWentWrong'
type role = {
  AllowedRole: string[]
}
const Auth = ({ AllowedRole }: role) => {
  const { data, isError, isLoading } = queries.useMe()
  const token = Storage.getToken()
  if (isLoading) return ;
  if (token) {
    if (!isError) {
      if (AllowedRole.includes(data?.role)) return <Outlet />
      else return <SomethingWentWrong text="403 Forbidden" />
    } else {
      Storage.removeToken()
      return <Navigate to="/login" />
    }
  }
  return <Navigate to="/login" />
}

export default Auth
