import React from 'react'
import DashboardNavbar from '../components/DashboardNavbar'
import StudentSidebar from '../components/StudentSidebar'
import { Outlet } from 'react-router-dom'

const StudentLayout = () => {
  return (
    <div className='flex flex-col h-screen'>
            <DashboardNavbar role='student' user="payal" />
            <div className='flex flex-1'>
                <StudentSidebar />
                <div className='flex-1 p-6 bg-gray-100 overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
    </div>
  )
}

export default StudentLayout