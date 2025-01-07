import MainLayout from "@/components/Layout/MainLayout";
import Accounting from "@/pages/Accounting/Accounting";
import DashboardLayout from "@/pages/DahsboardLayout/DahsboardLayout"; 
import Overview from "@/pages/Overview/Overview";
import Reports from "@/pages/Reports/Reports";
import NotFound from "@/pages/Shared/NotFound";
import Login from "@/pages/Social/Login";
import Register from "@/pages/Social/Register";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, 
    errorElement: <NotFound />, 
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      },
      {
        path: "login", 
        element: <Login />,
      },
      {
        path: "signup", 
        element: <Register />,
      },
      {
        path: "dashboard", 
        element: <DashboardLayout />, 
        children: [
          {
            index: true, 
            element: <Overview/>, 
          },
          {
            path: "accounting", 
            element: <Accounting/>, 
          },
          {
            path: "reports", 
            element: <Reports/>, 
          },
        ],
      },
    ],
  },
]);

export default router;
