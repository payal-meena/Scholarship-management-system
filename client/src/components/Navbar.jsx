import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
const Navbar = () => {
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
            </ScrollLink>{" "}
          </div>

          <div>
            <Link
              to="/login-page"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
