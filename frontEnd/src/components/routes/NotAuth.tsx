import Storage from "@utils/storage";
import { Navigate, Outlet } from "react-router-dom";

const NotAuth = () => {
  const token = Storage.getToken();
  if (!token) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default NotAuth;
