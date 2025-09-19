import React from 'react'
const role = "student";
const Navbar = () => {
  return (
    <nav className='bg-blue-600 text-white px-4 py-4 flex justify-between items-center shadow'>
        <h1 className='text-xl font-bold'>Scholarship Management</h1>
        <ul className='flex gap-6'>
            <li className='hover:underline cursor-pointer'>Home</li>

            {role === "student" && (
                    <>
                    <li className="hover:underline cursor-pointer">My Applications</li>
                    <li className="hover:underline cursor-pointer">Apply</li>
                    </>
            )}

            {role === "admin" && (
                <>
                <li className="hover:underline cursor-pointer">Dashboard</li>
                <li className="hover:underline cursor-pointer">Manage Users</li>
                </>
            )}
            
            <li className='hover:underline cursor-pointer'>Profile</li>
            <li className='hover:underline cursor-pointer'>Logout</li>
        </ul>
    </nav>
  )
}

export default Navbar