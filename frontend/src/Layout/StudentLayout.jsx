import React, { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import StudentSidebar from "../components/StudentSidebar";
import {toast} from "react-toastify";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentLayout = () => {
  const [isSidebarOpen,setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const pathParts = location.pathname.split('/');
  const activeLink = pathParts[pathParts.length-1] || 'dashboard';

      const [studentName, setStudentName] = useState("Student");
  
      useEffect(() => {
        const profile = async () => {
        try {
        
          const token = localStorage.getItem("studentToken");
          const headers = { Authorization: `Bearer ${token}` };
  
          const res = await axios.get("http://localhost:4000/api/students/me", {
            headers,
          });
  
          setStudentName(res.data.name.split(" ")[0]);
      }
       catch (error) {
          console.error("Profile Error:", error);
        }
        }
        profile();
      },[]);
 
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen bg-indigo-100">
      <DashboardNavbar
        role="Student"
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
        name={studentName}
      />

      <div className="flex pt-16 h-[100vh]">
        <StudentSidebar
          active={activeLink}
          open={isSidebarOpen}
          setOpen={setIsSidebarOpen}
          onLogout={handleLogout}
        />

        <main className="flex-1 p-4 md:p-8 md:mx-24 overflow-y-auto no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
