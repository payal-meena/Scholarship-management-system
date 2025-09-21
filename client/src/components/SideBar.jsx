import React from "react";

const SideBar = ({ role = "student", active, setActive }) => {
  const studentMenu = [
    { key: "apply", label: "Apply Scholarship" },
    { key: "my-applications", label: "My Applications" },
    { key: "profile", label: "Profile" },
  ];

  const adminMenu = [
    { key: "manage-students", label: "Manage Students" },
    { key: "manage-scholarships", label: "Manage Scholarships" },
    { key: "manage-applications", label: "Manage Appllications" },
    { key: "profile", label: "Admin Profile" },
  ];

  const menu = role === "admin" ? adminMenu : studentMenu;
  return (
    <aside className="w-64 bg-blue-600 text-white">
      <div className="p-6 font-bold text-lg border-b border-blue-500">
        {role === "admin" ? "Admin Dashboard" : "Student Dashboard"}
      </div>

      <nav className="px-4 py-6 space-y-4">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-500 transition ${
              active === item.key ? "bg-blue-500 font-semibold" : ""
            }`}
          >
            {item.label}
          </button>
        ))}

        <div className="absolute bottom-6 left-0 w-64 px-4">
          <button
            className="block w-full text-left px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
