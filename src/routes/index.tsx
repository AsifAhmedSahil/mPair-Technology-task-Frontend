
import MainLayout from "@/components/Layout/MainLayout";
import Dahsboard from "@/pages/Dashboard/Dahsboard";
import NotFound from "@/pages/Shared/NotFound";
import Login from "@/pages/Social/Login";
import Register from "@/pages/Social/Register";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path:"/",
        element: <MainLayout/>,
        errorElement:<NotFound></NotFound>,
        children: [
            {
              index: true,
              element: <Dahsboard />,
            },
            {
                path: "login",
                element: <Login />,
              },
              {
                path: "signup",
                element: <Register />,
              },
        ]
    }
])

export default router