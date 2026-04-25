import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/Home/NotFound";
import Login from "@/pages/Authentication/Login";
import Signup from "@/pages/Authentication/Signup";
import { userRoutes } from "./UserRoutes";
import DashboardLayout from "@/Layout/DashboardLayout/DashboardLayout";
import Home from "@/pages/Home/Home";
import { adminRoutes } from "./AdminRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Unauthorized from "@/common/Unauthorized";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    element: <ProtectedRoutes allowedRoles={["ADMIN"]} />,
    children: [
      {
        path: "/admin",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/admin/dashboard" replace />,
          },
          ...adminRoutes,
        ],
      },
    ],
  },
  {
    element: <ProtectedRoutes allowedRoles={["USER"]} />,
    children: [
      {
        path: "/user",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/user/dashboard" replace />,
          },
          ...userRoutes,
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
