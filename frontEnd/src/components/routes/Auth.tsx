import Storage from '../../utils/storage'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
    const token=Storage.getToken()
    if(token){
        return <Outlet/>
    }
  return <Navigate to='/signup'/>
}

export default Auth