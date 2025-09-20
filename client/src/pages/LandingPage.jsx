import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200'>

    <div className='text-center mb-12'>
        <h1 className='text-4xl font-extrabold text-gray-800'>Welcome to login Page</h1>
        {/* <p className='mt-3 text-lg text-gray-600'></p> */}
    </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl px-6'>

            <div className='bg-white shadow-xl rounded-2xl p-8 text-center'>
                <h2 className='text-2xl font-bold text-blue-700 mb-4'>Student</h2>
                <p className='text-gray-600 mb-6'>Login or Signup to apply for scholarship</p>
                <div className='space-y-4'>
                    <Link to="/student-login" className='block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition'>
                    Student Login
                    </Link>
                    <Link to="/student-signup" className='block w-full bg-blue-100 text-blue-700 py-3 rounded-xl font-semibold hover:bg-blue-200 transition'>
                    Student Signup
                    </Link>
                </div>
            </div>

            <div className='bg-white shadow-xl rounded-2xl p-8 text-center'>
                <h2 className='text-2xl font-bold text-green-700 mb-4'>Admin</h2>
                <p className='text-gray-600 mb-6'>Login to manage scholarships and students</p>
                <Link to="/admin-login" className='block w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition'>
                Admin Login
                </Link>
            </div>

        </div>
    </div>
 
)
}

export default LandingPage