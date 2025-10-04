import React from "react";
import { Menu, Bell, LogOut } from "lucide-react"; 

const DashboardNavbar = ({ role , toggleSidebar , onLogout }) => {
  const profileImageurl = "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"

  return (
    <nav className="bg-white shadow px-4 sm:px-6 py-3 flex justify-between items-center fixed w-full z-30 border-b border-indigo-100">
        <div className="flex items-center space-x-4">
        <button
        className="md:hidden text-gray-600 hover:text-indigo-600"
        onClick={toggleSidebar}
        >
        <Menu size={24}/>
        </button>
        <div className="text-xl font-bold text-indigo-600">
          Scholarship Portal
        </div>
      </div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        <button className="relative text-gray-600 hover:text-indigo-600 cursor-pointer">
          <Bell size={20} />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full animate-pulse">3</span>
        </button>

        <div className="flex items-center space-x-3 cursor-pointer group"> 
          <img src={profileImageurl} alt="profile"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300" />
       
          <div className="hidden sm:block">
              {/* <span></span> */}
              <span className="block text-xs font-medium text-indigo-600">({role})</span>
          </div>
        </div>

        <button onClick={onLogout}
        className="hidden cursor-pointer sm:flex items-center space-x-2 text-red-600 hover:text-white hover:bg-red-600 border border-red-600 transition-colors duration-200 px-3 py-1 rounded-md">
          <LogOut className="w-4 h-4"/>
          <span className="text-sm font-semibold">Logout</span>
        </button>

      </div>
    </nav>
  );
};

export default DashboardNavbar;
