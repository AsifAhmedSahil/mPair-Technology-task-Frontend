import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaWallet, FaChartBar } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";

const DahsboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

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
    <div className="flex">
      <div
        className={`flex flex-col bg-gray-800 text-white ${
          isSidebarOpen ? "w-[275px]" : "w-16"
        } h-[859px] transition-all duration-300`}
      >
        <button
          className="lg:hidden absolute bottom-10 left-4 text-green-500"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <IoMdCloseCircleOutline className="text-xl text-white ml-1 size-8" />
          ) : (
            <MdOutlineDashboardCustomize className="text-xl text-white ml-1 size-8" />
          )}
        </button>

        <div className="mt-8">
          <Link
            to="/dashboard"
            className="block py-3 px-6 hover:bg-gray-700 flex items-center space-x-2"
          >
            <FaHome className="text-xl sm:size-8" />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>

          <Link
            to="/dashboard/accounting"
            className="block py-3 px-6 hover:bg-gray-700 flex items-center space-x-2"
          >
            <FaWallet className="text-xl sm:size-8" />
            {isSidebarOpen && <span>Accounting</span>}
          </Link>

          <Link
            to="/dashboard/reports"
            className="block py-3 px-6 hover:bg-gray-700 flex items-center space-x-2"
          >
            <FaChartBar className="text-xl sm:size-8" />
            {isSidebarOpen && <span>Reports</span>}
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
