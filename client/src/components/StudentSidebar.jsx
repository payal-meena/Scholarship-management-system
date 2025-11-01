import React from "react";
import { Link } from "react-router-dom";
import { LogOut, User, FileText, LayoutDashboard } from "lucide-react";

const navItems = [
  {name: 'Dashboard', path: '/student-dashboard', icon:LayoutDashboard , key: 'student-dashboard'},
  {name: 'Apply Scholarship', path: '/student-dashboard/apply', icon:FileText , key: 'apply'},
  {name: 'My Applications', path: '/student-dashboard/my-applications', icon:FileText, key:'my-applications'},
  // {name: 'Profile', path:'/student-dashboard/profile', icon:User , key: 'profile'},
];

const NavLink = ({ item , active , onClick }) => {
  const isActive = item.key === active;

  return (
    <li key={item.key}>
        <Link
        to={item.path}
        onClick={onClick}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-150 ${
          isActive ? 'bg-indigo-600 text-white shadow-md'
          : 'text-gray-300 hover:bg-indigo-500 hover:text-white'
        }`}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.name}</span>
        </Link>
    </li>
  )
}

const StudentSidebar = ({ open, setOpen , active, onLogout }) => {
  const closeSidebar = ()=> setOpen(false);

  return (
    <>
    <div className="hidden md:flex flex-col w-64 bg-indigo-900 text-white space-y-4 p-4 min-h-full">
      <h2 className="text-xl font-extrabold text-white-400 mt-2 mb-4 tracking-wider">Student Menu</h2>
      <ul className="space-y-2 flex-1">
        {navItems.map(item => (
          <NavLink key={item.key} item={item} active={active}/>
        ))}
      </ul>

      <button
        onClick={onLogout}
        className="flex cursor-pointer items-center space-x-3 p-3 mt-4 text-gray-300 bg-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-150"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>

    {open && (
      <div className="fixed inset-0 z-40 flex md:hidden">
        <div 
          className="fixed inset-0 bg-black opacity-50"
          onClick={closeSidebar}
        ></div>

        <div className="relative w-64 bg-indigo-900 text-white p-4 space-y-4 z-50 flex flex-col">
          <h2 className="text-xl font-extrabold text-white-400 mt-2 mb-4 tracking-wider">Student Menu</h2>
          <ul className="space-y-2 flex-1">
              {navItems.map(item => (
                <NavLink key={item.key} item={item} active={active} onClick={closeSidebar}/>
              ))}
          </ul>
          <button
            onClick={() => {onLogout(); closeSidebar(); }}
            className="flex items-center space-x-3 p-3 mt-4 text-gray-300 bg-red-700 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-150"
          >
            <LogOut className="h-5 w-5"/>
            <span>Logout</span>
          </button>
        </div>
      </div>
    )}
    </>
  );
};

export default StudentSidebar;
