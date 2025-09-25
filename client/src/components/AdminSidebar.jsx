import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ open, setOpen }) => {
  const menu = [
    { path: "/admin/manage-scholarships", label: "Manage Scholarships" },
    { path: "/admin/manage-students", label: "Manage Students" },
    { path: "/admin/view-applications", label: "View Applications" },
    { path: "/admin/profile", label: "Profile" },
  ];

  return (
    <>
      <aside className="hidden md:flex w-64 bg-gray-800 text-white min-h-screen p-6 flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold mb-6">Admin Menu</h2>
          <nav className="space-y-3">
            {menu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded hover:bg-blue-500 transition ${
                    isActive ? "bg-blue-600 font-semibold" : ""
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div>
          <NavLink
            to="/"
            className="block px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition text-center"
          >
            Logout
          </NavLink>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setOpen(false)}
          ></div>

          <aside className="relative w-64 bg-gray-800 text-white p-6 flex flex-col justify-between z-50">
            <div>
              <h2 className="text-lg font-bold mb-6">Admin Menu</h2>
              <nav className="space-y-3">
                {menu.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 rounded hover:bg-blue-500 transition ${
                        isActive ? "bg-blue-600 font-semibold" : ""
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
            <div>
              <NavLink
                to="/"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition text-center"
              >
                Logout
              </NavLink>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
