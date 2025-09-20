import React from 'react'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div>
        <Navbar />

        <section id='home' className='bg-blue-50 text-center py-30 '>
            <h1 className='text-4xl md:text-5xl font-bold text-blue-700 mb-4 pt-20'> Welcome to Scholarship Management System</h1>
            <p className='text-lg tex-gray-600 mb-6 max-w-2xl mx-auto'> A centralized platform for students to apply for scholarships and for
          administrators to manage applications efficiently.</p>
        <a href="/login-page" className='bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition'>Get Started</a>
        </section>

        <section id='about' className='py-12 bg-white text-center '>
            <h2 className='text-3xl font-semibold text-blue-700 mb-6'>About Us</h2>
            <p className='max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed'>
              The Scholarship Management System is designed to streamline the process
          of applying for and managing scholarships. Students can apply online,
          upload necessary documents, and track their application status. Admins
          can review, approve, or reject applications with ease.  
            </p>
        </section>

        <section id='contact' className='py-16 bg-gray-100 text-center '>
            <h2 className='text-3xl font-semibold text-blue-700 mb-6'>Contact Us</h2>
            <p className='text-gray=600 mb-4'>Have questions? Reach out to us at:</p>
            <p className='font-medium text-lg'>support@scholarship.com</p>
            <p className='font-medium text-lg'>+91 98765 43210</p>
        </section>

        <footer className='bg-blue-600 text-white py-6 text-center'>
            <p>© {new Date().getFullYear()} Scholarship Management System. All rights reserved.</p>
        </footer>
    </div>
  )
}

export default Home