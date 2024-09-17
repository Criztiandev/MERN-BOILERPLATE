import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./page/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
]);

export default router;
