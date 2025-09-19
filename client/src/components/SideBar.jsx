import React from "react";

const role = "student";
const SideBar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 shadow p-4">
      <h2 className="text-lg font-semibold mb-6">Dashboard</h2>

      {role === "student" && (
        <ul className="spce-y-4">
          <li className="hover:text-blue-600 cursor-pointer">My Applications</li>
          <li className="hover:text-blue-600 cursor-pointer">Apply Scholarship</li>
          <li className="hover:text-blue-600 cursor-pointer">Settings</li>
        </ul>
      )}

      {role === "admin" && (
        <ul className="space-y-4">
          <li className="hover:text-blue-600 cursor-pointer">Overview</li>
          <li className="hover:text-blue-600 cursor-pointer">
            Create Scholarship
          </li>
          <li className="hover:text-blue-600 cursor-pointer">
            All Applications
          </li>
          <li className="hover:text-blue-600 cursor-pointer">Manage Users</li>
        </ul>
      )}
    </div>
  );
};

export default SideBar;
