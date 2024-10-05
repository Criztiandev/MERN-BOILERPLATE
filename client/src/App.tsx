/* eslint-disable react-hooks/exhaustive-deps */
import { RouterProvider } from "react-router-dom";
import authRoutes from "@/feature/auth/routes";
import userRoutes from "@/feature/user/routes";
import { useMemo } from "react";
import useAccountStore from "./feature/shared/store/useAccountStore";

const App = () => {
  const { credentials } = useAccountStore();
  const currentRole = useMemo(() => credentials?.role, [credentials?.role]);

  const protectedRoutes = {
    user: userRoutes,
    admin: userRoutes,
  };

  const selectedRoutes = useMemo(() => {
    const routes = currentRole ? protectedRoutes[currentRole] : authRoutes;
    return routes;
  }, [currentRole]);

  return <RouterProvider router={selectedRoutes} />;
};

export default App;
