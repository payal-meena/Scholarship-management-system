import React from 'react'

const DashboardNavbar = ({ role , name  }) => {
  return (
    <nav className='bg-white shadow px-6 py-4 flex justify-between items-center'>

        <div className='text-xl font-bold text-blue-600'>Scholarship Portal</div>
        <div className='flex items-center space-x-6'>
            <button className='relative text-gray-600 hover:text-blue-600 cursor-pointer'>🔔
                 <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full'>3</span>
            </button>

            <div className='flex items-center space-x-2 cursor-pointer'>
                <img src="https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg" 
                alt="profile" className='w-10 h-10 rounded-full border' />
                <span className='font-medium text-gray-700'>{name} ({role})</span>
            </div>
        </div>
    
    </nav>
  )
}

export default DashboardNavbar