import React, { useState } from 'react'
import DashboardNavbar from '../components/DashboardNavbar'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    const [active , setActive ] = useState("dashboard");
  return (

    <div className='flex flex-col h-screen'>
        <DashboardNavbar role="admin"/>
        <div className='flex flex-1 relative'>
            <AdminSidebar active={active} setActive={setActive}/>
            <main className='flex-1 p-6 bg-gray-100 oveflow-y-auto'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout