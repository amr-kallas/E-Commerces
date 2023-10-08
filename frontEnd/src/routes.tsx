import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/website/HomePage";
import { Signup, Login } from "./features/auth";
import NotAuth from "./components/routes/NotAuth";
import Auth from "./components/routes/Auth";
import Users from "./features/user";
export default createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<WithScroll />}>
        <Route element={<NotAuth />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<Auth/>}>
        <Route index element={<HomePage />} />
        <Route path="users" element={<Users />} />
        </Route>
      </Route>
  )
);
function WithScroll() {
  return (
    <>
      <Outlet />
    </>
  );
}
