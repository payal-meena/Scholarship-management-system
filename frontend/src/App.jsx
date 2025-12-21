import React from "react";
import { Routes, Route , useLocation, Navigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StudentLayout from "./Layout/StudentLayout";
import AdminLayout from "./Layout/AdminLayout";
import StudentSignupPage from "./pages/student/StudentSignupPage";
import ApplyScholarshipPage from "./pages/student/ApplyScholarshipPage";
import MyApplicationsPage from "./pages/student/MyApplicationsPage";
import ProfilePage from "./pages/student/ProfilePage";
import AdminDashboardHome from "./pages/admin/AdminDashboardHome";
import ManageScholarshipSchemes from "./pages/admin/ManageScholarshipSchemes";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import ManageApplicationsPage from "./pages/admin/ManageApplicationsPage";
import ManageStudentsPage from "./pages/admin/ManageStudentsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UnifiedLogin from "./pages/UnifiedLogin";
import StudentDashboardHome from "./pages/student/StudentDashboardHome";

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

  const isDashboardRoute = 
    location.pathname.includes('-dashboard') ;

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

      {!isDashboardRoute && (
      <Navbar onNavLinkClick={handleScroll} currentView={currentView} />
       )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/auth" element={<Navigate to="/unified-login" replace />} />
        <Route path="/unified-login" element={<UnifiedLogin />} />
        <Route path="/student-signup" element={<StudentSignupPage />} />
        {/* <Route path="/admin-login" element={<UnifiedLogin />} /> */}

        <Route element={<ProtectedRoute role="student" /> }>
          <Route path="/student-dashboard/*" element={<StudentLayout />}>
            <Route index element={<StudentDashboardHome />} />
            <Route path="apply" element={<ApplyScholarshipPage />} />
            <Route path="my-applications" element={<MyApplicationsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route index element={<ApplyScholarshipPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin-dashboard/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboardHome />} />
              <Route path="manage-applications" element={<ManageApplicationsPage />}/>
              <Route path="manage-scholarships" element={<ManageScholarshipSchemes />}/>
              <Route path="manage-students" element={<ManageStudentsPage />} />
              <Route path="profile" element={<AdminProfilePage />} />
          </Route>
        </Route>
        
      </Routes>
    </>
  );
};

export default App;
