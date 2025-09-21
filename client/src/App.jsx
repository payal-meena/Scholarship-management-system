import React from 'react'
import LandingPage from './pages/LandingPage'
import {Routes , Route} from 'react-router-dom'
import StudentLogin from './pages/StudentLogin'
import StudentSignupPage from './pages/StudentSignupPage'
import AdminLogin from './pages/AdminLogin'
import Home from './pages/Home'
import StudentLayout from './Layout/StudentLayout'
import AdminLayout from './Layout/AdminLayout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/student-login" element={<StudentLogin />}/>
      <Route path='/student-signup' element={<StudentSignupPage />} />
      <Route path="/admin-login" element={<AdminLogin />}/>
      <Route path='/login-page' element={<LandingPage />}/>
    
      <Route path ="/student/*" element={<StudentLayout />}>
        <Route path='apply' element={<h2>Apply Scholarship </h2>} />
        <Route path='my-applications' element={<h2>My Applications</h2>}/>
        <Route path='profile' element={<h2>Profile</h2>}/>
      </Route>

      <Route path ="/admin/*" element={<AdminLayout />}>
        <Route path='manage-scholarships' element={<h2>Manage Scholarships</h2>}/>
        <Route path='manage-students' element={<h2>Manage Students</h2>} />
        <Route path='view-applications' element={<h2>View Applications</h2>}/>
        <Route path='profile' element={<h2> Profile</h2>}/>
      </Route>

    </Routes>
  )
}

export default App