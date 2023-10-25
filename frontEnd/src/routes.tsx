import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { Signup, Login, GoogleCallBack } from './features/auth'
import NotAuth from './components/routes/NotAuth'
import Auth from './components/routes/Auth'
// import { Layout } from './features/layout'
import HomePage from './pages/website/HomePage'
import User from './pages/user'
import { lazy } from 'react'
const Layout = lazy(() => import("./features/layout"));

export default createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<NotAuth />}>
        <Route path="register" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<Auth />}>
        <Route element={<Layout />}>
          <Route path="" element={<HomePage />} />
          <Route path="users" element={<User />} />
        </Route>
      </Route>
      <Route path="auth/google/callback" element={<GoogleCallBack />} />
    </Route>
  )
)
// function WithScroll() {
//   return (
//     <>
//       <Outlet />
//     </>
//   );
// }
