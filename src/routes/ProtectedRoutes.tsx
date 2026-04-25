import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const ProtectedRoutes = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  // Check if the user is logged in and is an admin
  if (!user) {
    return <Navigate to="/" replace />;
  } else if (!allowedRoles.includes(user?.role as string)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
