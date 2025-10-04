import React from 'react'

const ProfilePage = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className='text-3xl font-bold text-gray-700 mb-6'>My profile & Documents</h2>
        <div className='space-y-4'>
            <div className='p-4 border rounded-md'>
                <h3 className='text-lg font-semibold'>Personal Information</h3>
                <p className='text-gray-600'>Name: Payal | Email: student@example.com</p>
            </div>
            <div className='p-4 border rounded-md'>
                <h3 className='text-lg font-semibold'>Academic Documents</h3>
                <p className='text-gray-600'>Transcripts, Recommendation Letters, etc. </p>
            </div>
            <button className='bg-indigo-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-indigo-600'>Edit Profile</button>
        </div>
    </div>
  )
}

export default ProfilePage