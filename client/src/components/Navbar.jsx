import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X , LogIn , Award} from "lucide-react"; 

const Navbar = ({onNavLinkClick , onViewChange , currentView}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {name: 'Home', href: '#home'},
    {name: 'About', href: '#about'},
    {name: 'Contact', href: '#contact'},
  ];

  const toggleMenu = ()=> {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault(); 
    onNavLinkClick(href); 
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-xl fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          <div onClick={() => onViewChange("login-page")} 
          className="flex-shrink-0 flex items-center">
            <Award className="h-7 w-7 text-indigo-600 mr-2" />
            <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
              ScholarshipPortal
            </span>
          </div>

          {currentView === "login-page" && (
            <div className="hidden md:flex md:space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ease-in-out"
              >
                {item.name}
              </a>
            ))}
            </div>
          )}

          <div className="flex items-center">
            <button
            onClick={()=> onViewChange(currentView === 'login-page' ? 'auth' : 'login-page')}
              className={`group flex items-center justify-center space-x-2 px-4 py-2 cursor-pointer border border-transparent text-sm font-medium rounded-full shadow-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                currentView === "login-page" 
                ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
                : 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-300'
              }`}
            >
              {currentView === 'login-page' ? (
                <>
                <LogIn className="h-5 w-5" />
              <span className="hidden md:inline">Login / Register</span>
              <span className="md:hidden">Login</span>
                </>
              ) : (
                <>
                <X className="h-5 w-5 " />
                <span>Close</span>
                </>
              )}
            </button> 

              {currentView === 'login-page' && (
                <div className="flex md:hidden ml-2">
                    <button
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    aria-expanded={isOpen}
                    >
                    <span className="sr-only">Open main menu</span>
                    {isOpen? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="block h-6 w-6" aria-hidden="true" />
                    )}
                    </button>
                </div>
              )}
          </div>
          </div>
          </div>
              
                {currentView === 'login-page' && (
                  <div 
                    className={`md:hidden transition-all duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100 py-2' : 'max-h-0 opacity-0 overflow-hidden'
                      }`}
                  >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={(e)=> handleLinkClick(e, item.href)}
                            className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium transition duration-150"
                          >
                            {item.name}
                          </a>
                        ))}

                        <button
                        onClick={()=> {
                          onViewChange('auth');
                          toggleMenu();
                        }}
                        className="w-full flex items-center justify-center mt-2 px-3 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                        >
                          <LogIn className="h-5 w-5 mr-2"/>
                          Login / Register
                        </button>
                      </div>
                   </div>
                )}
    </nav>
  );
};

export default Navbar;
