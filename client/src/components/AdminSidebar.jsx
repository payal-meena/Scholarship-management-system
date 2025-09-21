import React from 'react'
import { Link } from 'react-router-dom'
const AdminSidebar= () => {
  return (
    <div className='w-64 bg-gray-800 text-white p-6 space-y-4'>
        <h2 className='text-lg font-bold'>Admin Dashboard</h2>
        <hr />
        <ul className='space-y-3'>
            <li><Link to="/admin/manage-scholarships" >Manage Scholarships</Link> </li>
            <li><Link to="/admin/manage-students">Manage Students</Link></li>
            <li><Link to="/admin/view-applications">View Applications</Link></li>
            <li><Link to="/admin/profile">Profile</Link></li>
            <li><Link to="/admin/logout">Logout</Link></li>
        </ul>
    </div>
  )
}

export default AdminSidebar;