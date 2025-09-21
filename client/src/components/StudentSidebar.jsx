import React from 'react'
import { Link } from 'react-router-dom'
const StudentSidebar = () => {
  return (
    <div className='w-64 bg-gray-800 text-white p-6 space-y-4'> 
    <h2 className='text-lg font-bold'>Student Dashboard</h2>
        <ul className='space-y-3'>
            <li><Link to="/student/apply">Apply Scholarship</Link> </li>
            <li><Link to="/student/my-applications">My Applications</Link></li>
            <li><Link to="/student/profile">Profile</Link></li>
            <li><Link to="/student/logout">Logout</Link></li>
        </ul>
    </div>
  )
}

export default StudentSidebar