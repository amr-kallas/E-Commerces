import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { Signup, Login, GoogleCallBack } from '@dashbord/features/auth'
import NotAuth from '@components/routes/NotAuth'
import Auth from '@components/routes/Auth'
import { lazy } from 'react'
import { Category, Product, User } from './pages'
import Error404 from '@components/feedback/Error404'
import SomethingWentWrong from '@components/feedback/SomethingWentWrong'
import i18n from '@lib/i18n'
// import { LayoutWebsite } from '@website/layout'
import { Categories } from '@website/category'
const Layout = lazy(() => import('@dashbord/features/layout'))
const LayoutWebsite = lazy(() => import('@website/layout'))

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
      <Route element={<Auth AllowedRole={['1995', '1999']} />}>
        <Route element={<Layout />}>
          <Route element={<Auth AllowedRole={['1995']} />}>
            <Route path="users" element={<User />} />
          </Route>
          <Route element={<Auth AllowedRole={['1995', '1999']} />}>
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Product />} />
          </Route>
        </Route>
      </Route>
      <Route>
        <Route path="" element={<LayoutWebsite />}>
          <Route path=":id" element={<Categories />} />
        </Route>
      </Route>
      <Route path="auth/google/callback" element={<GoogleCallBack />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  )
)
