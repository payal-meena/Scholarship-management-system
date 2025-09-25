import React from "react";
import { Link } from "react-router-dom";

const StudentSidebar = ({ open, setOpen }) => {
  return (
    <>
      <div className="hidden md:block w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-lg font-bold">Student Dashboard</h2>
        <ul className="space-y-3">
          <li><Link to="/student/apply">Apply Scholarship</Link></li>
          <li><Link to="/student/my-applications">My Applications</Link></li>
          <li><Link to="/student/profile">Profile</Link></li>
          <li><Link to="/student/logout">Logout</Link></li>
        </ul>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setOpen(false)}
          ></div>

          <div className="relative w-64 bg-gray-800 text-white p-6 space-y-4 z-50">
            <h2 className="text-lg font-bold">Student Dashboard</h2>
            <ul className="space-y-3">
              <li><Link to="/student/apply" onClick={() => setOpen(false)}>Apply Scholarship</Link></li>
              <li><Link to="/student/my-applications" onClick={() => setOpen(false)}>My Applications</Link></li>
              <li><Link to="/student/profile" onClick={() => setOpen(false)}>Profile</Link></li>
              <li><Link to="/student/logout" onClick={() => setOpen(false)}>Logout</Link></li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentSidebar;
