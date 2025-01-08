import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaHome, FaWallet, FaChartBar } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { PiGreaterThanBold } from "react-icons/pi";

const DahsboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isLargeScreen) {
      setIsSidebarOpen(true);
    }
  }, [isLargeScreen]);

  return (
    <div className="flex h-screen">
      <div
        className={`flex flex-col bg-[#E4F2F8] text-[#373232] ${
          isSidebarOpen ? "w-[275px]" : "w-16"
        } h-[859px] transition-all duration-300`}
      >
        <button
          className="lg:hidden absolute bottom-10 left-4 text-green-500"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <IoMdCloseCircleOutline className="text-xl text-[#373232] ml-1 size-8" />
          ) : (
            <MdOutlineDashboardCustomize className="text-xl text-[#373232] ml-1 size-8" />
          )}
        </button>

        <div className="mt-8 ">
          <h2 className="text-[#2397C8] hidden lg:block font-semibold text-[26px] leading-4 ml-6 mt-4 mb-4">
            Accounting
          </h2>
          <Link
            to="/dashboard"
            className={`block py-3 px-6 flex items-center justify-between space-x-2 
        ${
          location.pathname === "/dashboard"
            ? "bg-[#D1E9F3] text-[#2397C8]"
            : "text-[#373232] hover:bg-[#D1E9F3] hover:text-[#2397C8]"
        }`}
          >
            <div className="flex items-center space-x-2">
              <FaHome className="text-xl sm:size-8" />
              {isSidebarOpen && <span>Dashboard</span>}
            </div>
            <div className="hidden lg:block">
              <PiGreaterThanBold />
            </div>
          </Link>

          <Link
            to="/dashboard/accounting"
            className={`block py-3 px-6 flex items-center justify-between space-x-2 
              ${
                location.pathname === "/dashboard/accounting"
                  ? "bg-[#D1E9F3] text-[#2397C8]"
                  : "text-[#373232] hover:bg-[#D1E9F3] hover:text-[#2397C8]"
              }`}
          >
            <div className="flex items-center space-x-2">
              <FaWallet className="text-xl sm:size-8" />
              {isSidebarOpen && <span>Accounting</span>}
            </div>
            <div className="hidden lg:block">
              <PiGreaterThanBold />
            </div>
          </Link>

          <Link
            to="/dashboard/reports"
            className={`block py-3 px-6 flex items-center justify-between space-x-2 
              ${
                location.pathname === "/dashboard/reports"
                  ? "bg-[#D1E9F3] text-[#2397C8]"
                  : "text-[#373232] hover:bg-[#D1E9F3] hover:text-[#2397C8]"
              }`}
          >
            <div className="flex items-center space-x-2">
              <FaChartBar className="text-xl sm:size-8" />
              {isSidebarOpen && <span>Reports</span>}
            </div>
            <div className="hidden lg:block">
              <PiGreaterThanBold />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DahsboardLayout;
