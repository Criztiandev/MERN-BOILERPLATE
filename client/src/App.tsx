/* eslint-disable react-hooks/exhaustive-deps */
import { RouterProvider } from "react-router-dom";
import authRoutes from "@/feature/auth/routes";
import { useAuth } from "./common/provider/AuthProvider";
import userRoutes from "@/feature/user/user.routes";
import { useMemo } from "react";

const App = () => {
  const { user } = useAuth();
  const currentRole = useMemo(() => user?.role, [user?.role]);

  const protectedRoutes = {
    user: userRoutes,
    admin: userRoutes,
  };

  const selectedRoutes = useMemo(() => {
    const routes = currentRole ? protectedRoutes[currentRole] : authRoutes;
    return routes;
  }, [currentRole]);

  console.log(selectedRoutes);

  return <RouterProvider router={selectedRoutes} />;
};

export default App;
