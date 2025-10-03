import React from "react";
import { Routes, Route , useLocation} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StudentLayout from "./Layout/StudentLayout";
import AdminLayout from "./Layout/AdminLayout";
import LandingPage from "./pages/LandingPage";
import StudentLogin from "./pages/StudentLogin";
import StudentSignupPage from "./pages/StudentSignupPage";
import AdminLogin from "./pages/AdminLogin";

const getCurrentView = (pathname) => {
  if(pathname === '/') {
    return 'login-page';
  }
  if(pathname === '/auth' || pathname.includes('-login') || pathname.includes('-signup')) {
    return 'auth';
  }
  return 'default';
};

const App = () => {
  const location = useLocation();
  const currentView = getCurrentView(location.pathname);

  const handleScroll = (id)=> {
    if(currentView === 'login-page') {
      const element = document.getElementById(id.substring(1));
      if(element) {
        element.scrollIntoView({ behavior: 'smooth'});
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000} // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Navbar onNavLinkClick={handleScroll} currentView={currentView} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<LandingPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignupPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/student-dashboard/*" element={<StudentLayout />}>
          <Route path="apply" element={<h2>Apply Scholarship </h2>} />
          <Route path="my-applications" element={<h2>My Applications</h2>} />
          <Route path="profile" element={<h2>Profile</h2>} />
        </Route>

        <Route path="/admin-dashboard/*" element={<AdminLayout />}>
          <Route
            path="manage-scholarships"
            element={<h2>Manage Scholarships</h2>}
          />
          <Route path="manage-students" element={<h2>Manage Students</h2>} />
          <Route
            path="view-applications"
            element={<h2>View Applications</h2>}
          />
          <Route path="profile" element={<h2> Profile</h2>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
