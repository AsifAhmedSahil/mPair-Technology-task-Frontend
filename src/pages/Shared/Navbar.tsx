import { Link } from "react-router-dom";

import { CiMenuBurger } from "react-icons/ci";
import logo from "@/assets/purelogo.png";
import { useState } from "react";
// import { navItems } from "@/constants";
import { X } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { RootState } from "@/redux/store";
// import { logout } from "@/redux/features/userSlice";
// import { toast } from "sonner";

export const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  //   const { user } = useAppSelector((state: RootState) => state.user);
  //   console.log(user);

  //   const dispatch = useAppDispatch()

  //   const handleLogout = () =>{
  //     dispatch(logout())
  //     toast.success("Log Out Successfully",{duration:2000})
  //   }

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <div className="bg-[#2397C8] h-[70px] w-full">
      <div className="px-4  ">
        <div className="py-4  flex items-center justify-between">
          {/* logo + name */}
          <div className="flex items-center justify-center gap-4 ">
            <div className="relative">
              <div className="  top-[20px]  left-[46px]"></div>
              <Link to={"/"}>
                <img
                  src={logo}
                  alt="saas image"
                  className="h-[30.5px] w-[72.08px] relative"
                />
              </Link>
            </div>
            <div className="text-white text-sm lg:text-2xl font-bold">
              <Link to={"/"}>{/* <GradualSpacingDemo /> */}</Link>
            </div>
          </div>
          <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-sm sm:hidden">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? (
                <X className="text-white" />
              ) : (
                <CiMenuBurger className="text-white" size={20} />
              )}
            </button>
          </div>

          {/* ****************************** For mobile menu *********************************** */}
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 top-20 bg-black text-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
              <div className="flex sm:flex-col space-x-6 mt-4">
                <Link
                  to="/dashboard/addItems"
                  className="py-2 px-3 rounded-md bg-gradient-to-r from-green-500 to-green-800 text-white"
                >
                  Dashboard
                </Link>
                <Link to={"/login"}>
              <button
                type="button"
                className="text-black bg-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login
              </button>
            </Link>
              </div>
            </div>
          )}

          {/* ********************************Desktop menu navigation ************************************* */}

          <div className="hidden lg:flex gap-4 ">
            <Link to={"/login"}>
              <button
                type="button"
                className="text-black bg-white  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
