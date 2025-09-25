import React, { useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import StudentSidebar from "../components/StudentSidebar";
import { Outlet } from "react-router-dom";

const StudentLayout = () => {
  const [active, setActive] = useState("apply");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <DashboardNavbar
        role="student"
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-1 relative">
        <StudentSidebar
          active={active}
          setActive={setActive}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />

        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
