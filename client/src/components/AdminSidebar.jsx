import React from "react";
import { Link } from "react-router-dom";
import { LogOut, User, List, Users, Briefcase, LayoutDashboard} from "lucide-react"

const navItems = [
  {name: 'Dashboard', path: '/admin-dashboard', icon: LayoutDashboard, key: 'admin-dashboard'},
  {name: 'Manage Applications', path: '/admin-dashboard/manage-applications', icon: List, key: 'manage-applications'},
  {name: 'Manage Scholarships', path: '/admin-dashboard/manage-scholarships', icon: Briefcase, key: 'manage-scholarships'},
  {name: 'Manage Students', path: '/admin-dashboard/manage-students', icon: Users, key: 'manage-students'},
  // {name: 'Profile', path: '/admin-dashboard/profile', icon: User, key: 'profile'},
];

const NavLink = ({ item, active, onClick}) => {
  const isActive = item.key === active;

  return (
    <li key={item.key}>
      <Link  
      to={item.path}
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 rounded-lg transition--colors duration-150 ${
        isActive 
        ? 'bg-violet-600/30 text-white shadow-md'
        : 'text-gray-300 hover:bg-violet-500/20 hover:text-white'
      }`}
    >
      <item.icon className="w-5 h-5" />
      <span>{item.name}</span>
      </Link>
    </li>
  );
};

const AdminSidebar = ({ open, setOpen, active, onLogout }) => {
    const closeSidebar = ()=> setOpen(false);
  return (
    <>
    <div className="hidden md:flex flex-col w-64 bg-indigo-950 text-white space-y-4 p-4 min-h-full">
      <h2 className="text-xl font-extrabold text-white-400 mt-2 mb-4 tracking-wider">Admin Menu</h2>
      <ul className="space-y-2 flex-1">
        {navItems.map(item => (
          <NavLink key={item.key} item={item} active={active} />
        ))}
      </ul>

      <button
      onClick={onLogout}
      className="flex items-center space-x-3 p-3 mt-4 text-gray-300 rounded-lg hover:bg-violet-500/20 hover:text-white transition-colors duration-150 cursor-pointer"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>

    {open && (
      <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-black opacity-50"
          onClick={closeSidebar}
          ></div>

          <div className="relative w-64 bg-indigo-950 text-white p-4 space-y-4 z-50 flex flex-col">
              <h2 className="text-xl font-extrabold text-white-400 mt-2 mb-4 tracking-wider">Admin Menu</h2>
              <ul className="space-y-2 flex-1">
                  {navItems.map(item => (
                    <NavLink key={item.key} item={item} active={active} onClick={closeSidebar} />
                  ))}
              </ul>
              <button
                onClick={()=> {onLogout(); closeSidebar(); }}
                className="flex items-center space-x-3 p-3 mt-4 text-gray-300 rounded-lg hover:bg-violet-500/20 hover:text-white transition-colors duration-150 cursor-pointer"
              >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
              </button>
          </div>
      </div>
    )}
    </>
  );
};

export default AdminSidebar;
