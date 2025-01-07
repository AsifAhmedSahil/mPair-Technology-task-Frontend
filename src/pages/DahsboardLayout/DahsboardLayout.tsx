import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaWallet, FaChartBar } from "react-icons/fa"; // Importing icons
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";

const DahsboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar open/close

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-gray-800 text-white ${
          isSidebarOpen ? "w-[275px]" : "w-16"
        } h-[859px] transition-all duration-300`}
      >
        {/* Sidebar toggle button for mobile */}
        <button
          className="lg:hidden absolute bottom-10 left-4 text-green-500"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <IoMdCloseCircleOutline className="text-xl text-white ml-1 size-8"/> : <MdOutlineDashboardCustomize className="text-xl text-white ml-1 size-8"/>}
        </button>

        {/* Sidebar Menu */}
        <div className="mt-8">
          {/* Dashboard Link */}
          <Link to="/dashboard" className="block py-3 px-6 hover:bg-gray-700 flex items-center space-x-2">
            <FaHome className="text-xl sm:size-8" />
            {isSidebarOpen && <span>Dashboard</span>}
          </Link>

          {/* Accounting Link */}
          <Link
            to="/dashboard/accounting"
            className="block py-3 px-6 hover:bg-gray-700 flex items-center space-x-2"
          >
            <FaWallet className="text-xl sm:size-8" />
            {isSidebarOpen && <span>Accounting</span>}
          </Link>

          {/* Reports Link */}
          <Link
            to="/dashboard/reports"
            className="block py-3 px-6 hover:bg-gray-700 flex items-center space-x-2"
          >
            <FaChartBar className="text-xl sm:size-8" />
            {isSidebarOpen && <span>Reports</span>}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DahsboardLayout;
