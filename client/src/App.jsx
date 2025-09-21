import React from 'react'
import LandingPage from './pages/LandingPage'
import {Routes , Route} from 'react-router-dom'
import StudentLogin from './pages/StudentLogin'
import StudentSignupPage from './pages/StudentSignupPage'
import AdminLogin from './pages/AdminLogin'
import Home from './pages/Home'
import StudentDashboard from './pages/StudentDashboard'

const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/student-login" element={<StudentLogin />}/>
      <Route path='/student-signup' element={<StudentSignupPage />} />
      <Route path="/admin-login" element={<AdminLogin />}/>
      <Route path='/login-page' element={<LandingPage />}/>
    
      <Route path ="/student/*" element={<StudentDashboard />}>
        <Route path='apply' element={<h2>Apply Scholarship </h2>} />
        <Route path='my-applications' element={<h2>My Applications</h2>}/>
        <Route path='profile' element={<h2>Profile</h2>}/>
      </Route>


    </Routes>
  )
}

export default App