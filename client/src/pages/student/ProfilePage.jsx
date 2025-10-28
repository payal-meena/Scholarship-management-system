import React, { useEffect, useState } from 'react'
import { User, Lock, Mail, Phone, Hash } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProfilePage = () => {

    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('studentToken');
          if(!token) {
            throw new Error('No authentication token found.');
          }

          const response = await axios.get('http://localhost:4000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setStudentData(response.data);
        } catch (error) {
          console.error("Error fetching profile:", error);
          toast.error(error.response?.data?.message || "Failed to load profile data. Please login again.");
        } finally {
          setLoading(false);
        }
      };
      
      fetchProfile();
    }, [])
    const handlePassowordChange = () => {
      alert("Functionality to change password will be implemented here with a modal.");
    };

    if(loading) {
      return <div className='text-center p-8'>Loading student profile...</div>;
    }

    if(!studentData) {
      return <div className='text-center p-8 text-red-600'>Could not retrieve user data.</div>;
    }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl mx-auto">
        <h1 className='text-3xl font-extrabold text-indigo-700 mb-6 border-b pb-3 flex items-center'>
          <User className='w-7 h-7 mr-3'/> My profile
        </h1>

        <div className='space-y-6'>

            <div className='p-4 border rounded-md'>
                <h2 className='text-xl font-semibold mb-3 text-indigo-800'>Personal Information</h2>
                <p className='flex items-center text-gray-700 space-x-2'>
                  <User className='w-4 h-4 text-indigo-600'/>
                  <span>Name: <strong>{studentData.name}</strong></span>
                </p>
                <p className='flex items-center text-gray-700 space-x-2 mt-2'>
                  <Hash className='w-4 h-4 text-indigo-600' />
                  <span>Student ID:{studentData.studentId}</span>
                </p>
            </div>

            <div className='p-4 border border-gray-200 rounded-lg bg-gray-50'>
                <h2 className='text-xl font-semibold mb-3 text-gray-800'>Login & Contact</h2>
                <p className='flex items-center text-gray-700 space-x-2'>
                  <Mail className='w-4 h-4 text-gray-600' />
                  <span>Email: {studentData.email}</span>
                </p>
                <p className='flex items-center text-gray-700 space-x-2 mt-2'>
                  <Phone className='w-4 h-4 text-gray-600'/>
                  <span>Contact: {studentData.contact}</span>
                </p>
            </div>

            <div className='p-4 border border-red-200 rounded-lg bg-red-50/50 flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-red-700 flex items-center space-x-2'>
                  <Lock className='w-5 h-5' /><span>Security Settings</span>
                </h2>
                <button
                  onClick={handlePassowordChange}
                  className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition'
                >
                    Change Password
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage