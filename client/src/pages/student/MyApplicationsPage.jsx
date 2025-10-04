import React from 'react'

const MyApplicationsPage = () => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-green-700 mb-6'>My Applications Status</h2>
        <p className='text-gray-600 mb-4'>This page tracks all submitted applications and their current processing status.
</p>

        <ul className='space-y-3'>
            <li className='p-3 border rounded-md flex justify-between items-center bg-green-50'>
                <span className='font-medium'>Central Sector Scholarship</span>
                <span className='text-sm text-green-700 font-semibold'>Approved</span>
            </li>
            <li className='p-3 border rounded-md flex justify-between items-center bg-yellow-50'>
                <span className='font-medium'>Post Metric Scholarship</span>
                <span className='text-sm text-yellow-700 font-semibold'>Pending</span>
            </li>
        </ul>
    </div>
  );
};

export default MyApplicationsPage