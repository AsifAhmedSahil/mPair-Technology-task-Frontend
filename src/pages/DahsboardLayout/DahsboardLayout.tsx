import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const DahsboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="flex">
      <div
        className={`flex flex-col bg-gray-800 text-white ${
          isSidebarOpen ? "w-[275px]" : "w-16"
        } h-[859px] transition-all duration-300`}
      >
        <button
          className="lg:hidden absolute top-4 left-4 text-white"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close" : "Open"}
        </button>

        <div className="mt-8">
          <Link to="/dashboard" className="block py-3 px-6 hover:bg-gray-700">
            {isSidebarOpen ? "Dashboard" : ""}
          </Link>
          <Link
            to="/dashboard/accounting"
            className="block py-3 px-6 hover:bg-gray-700"
          >
            {isSidebarOpen ? "Accounting" : ""}
          </Link>
          <Link
            to="/dashboard/reports"
            className="block py-3 px-6 hover:bg-gray-700"
          >
            {isSidebarOpen ? "Reports" : ""}
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
