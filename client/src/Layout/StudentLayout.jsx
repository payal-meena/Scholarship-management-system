import React, { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import StudentSidebar from "../components/StudentSidebar";
import {toast} from "react-toastify";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const StudentLayout = () => {
  const [isSidebarOpen,setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/');
  const activeLink = pathParts[pathParts.length-1] || 'dashboard';

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <DashboardNavbar
        role="Student"
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
        name="Payal"
      />

      <div className="flex flex-1 pt-16 min-h-screen">
        <StudentSidebar
          active={activeLink}
          open={isSidebarOpen}
          setOpen={setIsSidebarOpen}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-4 md:p-8 md:ml-64 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
