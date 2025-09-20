import React from 'react'
import LandingPage from './pages/LandingPage'
import {Routes , Route} from 'react-router-dom'
import StudentLogin from './pages/StudentLogin'
import StudentSignupPage from './pages/StudentSignupPage'
import AdminLogin from './pages/AdminLogin'
import Home from './pages/Home'

const App = () => {
  return (
    <Routes>
      <Route path="/" element = {<Home/>}/>
      <Route path="/student-login" element={<StudentLogin />}/>
      <Route path='/student-signup' element={<StudentSignupPage />} />
      <Route path="/admin-login" element={<AdminLogin />}/>
      <Route path='/login-page' element={<LandingPage />}/>
    

    </Routes>
    // <div className='flex flex-col h-screen'>
    //   <Navbar />

    //   <div className='flex flex-1'>
    //   <SideBar />

    //   <main className='flex-1 p-6 bg-gray-50'>
    //     <h1 className='text-2xl font-bold mb-4'>Welcome to Scholarship Management System</h1>
    //     <p>Select an option from the sidebar.</p>
    //   </main>
    //   </div>
    // </div>
  )
}

export default App