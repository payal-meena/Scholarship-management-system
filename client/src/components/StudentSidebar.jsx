import React from 'react'
import { NavLink } from 'react-router-dom'
const StudentSidebar = () => {
  const menu = [
    {path: "/student/apply",label: "Apply Scholarship"},
    {path: "/student/my-applications", label: "My Applications"},
    {path: "/student/profile" , label: "Profile"},
    {path: "/student/logout" , label: "Logout"},
  ];

  return (
    <aside className='w-64 bg-gray-800 text-white min-h-screen p-6 flex flex-col justify-between'> 
        <div>
          <h2 className='text-lg font-bold mb-6'>Student Menu</h2>
          <nav className='space-y-3'>
              {menu.map((item) => (
                <NavLink key={item.path}
                to={item.path}
                className={({isActive}) => `block px-4 py-2 rounded hover:bg-blue-500 transition ${isActive ? "bg-blue-600 font-semibold" : "" }`}>
                  {item.label}
                </NavLink>
              ))}
          </nav>
        </div>

        <div>
          <NavLink to="/" className="block px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition text-center">
            Logout
          </NavLink>
        </div>
    </aside>
  )
}

export default StudentSidebar