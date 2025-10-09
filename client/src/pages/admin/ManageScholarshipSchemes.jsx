import React from 'react'
import { PlusCircle, Edit } from 'lucide-react'

const ManageScholarshipSchemes = () => {
    const schemes = [
        {name: "Central Sector Scholarship", deadline: "2025-10-31", status: "Active"},
        {name: "Post Metric Scholarship", deadline: "2025-12-31", status: "Active"},
        {name: "Gav Ki Beti Scholarship", deadline: "2025-11-31", status: "Closed"},
    ];

  return (
    <div className='p-6 bg-white rounded-xl shadow-lg'>
        <div className='flex justify-between items-center mb-6 border-b pb-2'>
            <h1 className='text-3xl font-semibold text-gray-800'>Manage Schemes</h1>
            <button className='bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700'>
                <PlusCircle className='w-5 h-5' />
                <span>Add Scheme</span>
            </button>
        </div>

        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Scheme Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Deadline</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {schemes.map((scheme, index) => (
                        <tr key={index}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{scheme.name}</td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{scheme.deadline}</td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${scheme.status === 'Active' ? 'bg-indigo-800' : 'bg-gray-100 text-gray-800'}`}>
                                {scheme.status}
                         </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                            <button className='text-indigo-600 hover:text-indigo-900 flex items-center space-x-1'>
                                <Edit className='w-4 h-4' /> <span>Edit</span>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ManageScholarshipSchemes