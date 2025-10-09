import React from 'react'
import { User, Lock, Mail} from 'lucide-react'

const AdminProfilePage = () => {
  return (
    <div className='p-6 bg-white rounded-xl shadow-lg max-w-2xl mx-auto'>
        <h1 className='text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2'>Admin Profile Settigs</h1>

        <div className='space-y-6'>
            <div className='p-4 border border-gray-200 rounded-lg'>
                <h2 className='text-xl font-semibold mb-3 flex items-center space-x-2 text-indigo-600'>
                    <User className='w-5 h-5'/> <span>Personal Details</span>
                </h2>
                <p className='text-gray-700'>Name: College Manager Name</p>
                <p className='text-gray-700 flex items-cente space-x-1 mt-1'>
                    <Mail className='w-4 h-4 text-gray-500'/>
                    <span>Email: admin@ssism.org</span>
                </p>
            </div>

            <div className='p-4 border border-gray-200 rounded-lg'> 
                <h2 className='text-xl font-semibold mb-3 flex items-center space-x-2 text-red-600'>
                    <Lock className='w-5 h-5'/> <span>Security & Access</span>
                </h2>
                <button className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>
                    Change Password
                </button>
            </div>
        </div>
    </div>
  );
};

export default AdminProfilePage