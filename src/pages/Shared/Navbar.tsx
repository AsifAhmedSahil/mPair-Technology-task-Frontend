import { Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import logo from "@/assets/purelogo.png";
import { useState } from "react";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/userSlice";
import { RootState } from "@/redux/store";

export const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.user);
  console.log(user);
  

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    
    
  };

  const handleLogout = () => {
    // Replace with actual logout logic
    console.log("Logged out");
    dispatch(logout());
    setMobileDrawerOpen(false);
    setDropdownOpen(false)
  };

  return (
    <div className="bg-[#2397C8] h-[70px] w-full">
      <div className="px-4">
        <div className="py-4 flex items-center justify-between">
          {/* Logo + name */}
          <div className="flex items-center justify-center gap-4 ml-5">
            <Link to={"/dashboard"}>
              <img
                src={logo}
                alt="Logo"
                className="h-[30.5px] w-[72.08px] relative"
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          
          <div className="border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-sm sm:hidden">
            
            <button onClick={toggleNavbar}>
              
              {mobileDrawerOpen ? (
                <X className="text-white" />
              ) : (
                <CiMenuBurger className="text-white" size={20} />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileDrawerOpen && (
  <div className="fixed right-0 z-20 top-16 bg-[#2397C8] text-white w-full p-12 flex flex-col justify-center items-center lg:hidden">
    <div className="flex sm:flex-col space-x-6 mt-4">
      {/* Check if the user is logged in */}
      {user ? (
        <>
        <div className="flex flex-col items-center -mt-10 gap-2 text-white font-medium rounded-lg text-sm mr-5">
                  <div className="text-start text-2xl ">
                    <div>{user?.name}</div>
                    <div>{user?.position}</div>
                  </div>
                 
                
         
          <div className="flex gap-3  w-full ">
          <div className="mt-4">
            <Link to="/dashboard/profile">
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-black bg-white rounded-md"
                onClick={() => setMobileDrawerOpen(false)}
              >
                Profile
              </button>
            </Link>
          </div>
          <div className="mt-4">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-black bg-white rounded-md"
            >
              Logout
            </button>
          </div>
          </div>
          </div>
        </>
      ) : (
        // Show Login button if user is not logged in
        <Link to={"/login"}>
          <button
            type="button"
            className="bg-[#2397C8] text-white border-2 border-white px-4 py-2"
          >
            Login
          </button>
        </Link>
      )}
    </div>
  </div>
)}


          {/* Desktop menu */}
          <div className="hidden lg:flex gap-4">
            {!user ? (
              <Link to={"/login"}>
                <button
                  type="button"
                  className="bg-[#2397C8] text-white border-2 border-white px-4 py-1 rounded-md"
                >
                  Login
                </button>
              </Link>
            ) : (
              <div className="relative">
                <div className="flex items-center gap-2 text-white font-medium rounded-lg text-sm mr-5">
                  <div className="text-start">
                    <div>{user.name}</div>
                    <div>{user.position}</div>
                  </div>
                  <button onClick={toggleDropdown}>
                    <img
                      src={user?.image}
                      alt="User"
                      className="h-10 w-10 rounded-full"
                    />
                  </button>
                </div>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 z-99 bg-white text-black rounded-md shadow-lg">
                    <Link
                      to="/dashboard/profile"
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
