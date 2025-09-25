import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react"; 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 text-2xl font-bold">
            <Link to="/">Scholarship System</Link>
          </div>

          <div className="hidden md:flex space-x-6">
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              className="cursor-pointer hover:text-gray-200"
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              className="cursor-pointer hover:text-gray-200"
            >
              About
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              className="cursor-pointer hover:text-gray-200"
            >
              Contact
            </ScrollLink>
          </div>

          <div className="hidden md:block">
            <Link
              to="/login-page"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-4 py-3 space-y-2">
            <ScrollLink
              to="home"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              className="block cursor-pointer hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </ScrollLink>
            <ScrollLink
              to="about"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              className="block cursor-pointer hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </ScrollLink>
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              className="block cursor-pointer hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </ScrollLink>
            <Link
              to="/login-page"
              className="block bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
