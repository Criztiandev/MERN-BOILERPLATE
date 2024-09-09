import { RouterProvider } from "react-router-dom";
import authRoutes from "@/feature/auth/routes";

const App = () => {
  return <RouterProvider router={authRoutes} />;
};

export default App;
