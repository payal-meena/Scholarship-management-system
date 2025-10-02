import { Landmark, User } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom'



const LandingPage = ({onViewChange}) => {
    
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4'>
    <div className='text-center w-full max-w-4xl mx-auto'>
        <h1 className='text-4xl font-extrabold text-gray-800 my-12 pt-5'>Welcome to the Login Portal</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-6'>

            <div className='bg-white shadow-xl rounded-2xl p-8 text-center border-t-4 border-indigo-500'>
                <User className='h-10 w-10 text-indigo-600 mx-auto mb-4' />
                <h2 className='text-2xl font-bold text-indigo-700 mb-4'>Student</h2>
                <p className='text-gray-600 mb-6'>Login or Signup to discover and apply for scholarships.</p>
                <div className='space-y-4'>
                    <Link to="/student-login" className='block w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition'>
                    Student Login
                    </Link>
                    <Link to="/student-signup" className='block w-full bg-indigo-100 text-indigo-700 py-3 rounded-xl font-semibold hover:bg-indigo-200 transition'>
                    Student Signup
                    </Link>
                </div>
            </div>

            <div className='bg-white shadow-xl rounded-2xl p-8 text-center border-t-4 border-green-500'>
                <Landmark className='h-10 w-10 text-green-700 mx-auto mb-4'/>
                <h2 className='text-2xl font-bold text-green-700 mb-4'>Admin</h2>
                <p className='text-gray-600 mb-6'>Login to manage scholarships and students</p>
                <Link to="/admin-login" className='block w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition'>
                Admin Login
                </Link>
            </div>
        </div>
            <div className="mt-8 text-center">
                <button onClick={()=> onViewChange("login-page")}  className="cursor-pointer text-sm text-indigo-600 hover:text-indigo-800 transition">
                    ← Back to Home Page
                </button>
            </div>
        </div>
    </div>
 
)
}

export default LandingPage