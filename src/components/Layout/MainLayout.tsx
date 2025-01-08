
import {Navbar} from "@/pages/Shared/Navbar"
import { Outlet } from "react-router-dom"


const MainLayout = () => {
  return (
    <div className="w-full min-h-screen overflow-hidden ">
        <Navbar/>
        <Outlet/>
        
    </div>
  )
}

export default MainLayout