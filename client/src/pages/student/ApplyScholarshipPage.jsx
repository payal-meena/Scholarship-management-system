import React from 'react'

const ApplyScholarshipPage = () => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-indigo-700 mb-6'>Apply for Scholarships</h2>
        <p className='text-gray-600 mb-4'>Fill out the scholarship application form to apply for scholarships.</p>
        <div className='border border-indigo-200 p-4 rounded-md'>
          <h3 className='text-lg font-semibold'>Scholarship Name : Central Sector 2025-26</h3>
          <p>Deadline: October 31 2025</p>
          <button className='mt-2 bg-indigo-500 text-white px-4 py-2 cursor-pointer rounded hover:bg-indigo-600'>Start Application</button>
        </div>
    </div>
  );
};

export default ApplyScholarshipPage