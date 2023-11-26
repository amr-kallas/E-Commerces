import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { Signup, Login, GoogleCallBack } from './features/auth'
import NotAuth from './components/routes/NotAuth'
import Auth from './components/routes/Auth'
import { lazy } from 'react'
import { Category, Home, Product, User } from './pages'
import { Writter } from './features/writter'
import Error404 from './components/feedback/Error404'
import SomethingWentWrong from './components/feedback/SomethingWentWrong'
import i18n from './lib/i18n'
const Layout = lazy(() => import('./features/layout'))

export default createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      errorElement={
        <SomethingWentWrong text={i18n.t('error:someThingWentWrong')} />
      }
    >
      <Route element={<NotAuth />}>
        <Route path="register" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
      <Route element={<Auth AllowedRole={['1995', '1996', '1999']} />}>
        <Route element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route element={<Auth AllowedRole={['1995']} />}>
            <Route path="users" element={<User />} />
          </Route>
          <Route element={<Auth AllowedRole={['1995', '1999']} />}>
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
          </Route>
          <Route element={<Auth AllowedRole={['1995', '1996']} />}>
            <Route path="writter" element={<Writter />} />
          </Route>
        </Route>
      </Route>
      <Route path="auth/google/callback" element={<GoogleCallBack />} />
      <Route path="*" element={<Error404 />} />
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
