import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import ProtectedRoutes from "@/common/components/hoc/ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoutes allowedRoutes={["admin"]}>
        <RegisterPage />
      </ProtectedRoutes>
    ),
  },
]);

export default router;
