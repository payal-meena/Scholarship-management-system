import React, { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split("/");
  const activeLink = pathParts[pathParts.length - 1] || "dashboard";

  const handleLogout = ()=> {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/");
  }

  return (
    <div className="flex flex-col min-h-screen bg-indigo-100">
      <DashboardNavbar role="Admin" name="" toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} onLogout={handleLogout} />

      <div className="flex flex-1 pt-16 min-h-screen">
        <AdminSidebar active={activeLink} open={isSidebarOpen} setOpen={setIsSidebarOpen} onLogout={handleLogout} />

        <main className="flex-1 p-4 md:p-8 md:mx-24 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
