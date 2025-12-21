import React, { useEffect, useState } from 'react'
import { User, Lock, Mail, Phone, Hash, FileText, UserRoundCog, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import PasswordUpdateModal from './PasswordUpdateModal';

const ProfilePage = () => {

    const [studentData, setStudentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);
    

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem('studentToken');
          if(!token) {
            throw new Error('No authentication token found.');
          }

          const response = await axios.get('http://localhost:4000/api/students/me', {
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

    const handlePassowordChange = async(passwordData) => {
      const { currentPassword, newPassword, confirmPassword } = passwordData;

      if (!currentPassword || !newPassword || newPassword !== confirmPassword) {
        toast.error("Please ensure all password fields are filled and match.");
        return;
      }

      if(newPassword.length < 6) {
        toast.error("New password must be at least 6 characters long.");
        return;
      }

      setIsPasswordLoading(true);
      try {
        const token = localStorage.getItem('studentToken');
        const response = await axios.put('http://localhost:4000/api/students/password-change', { 
          currentPassword,
           newPassword 
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success(response.data.message || "Password updated successfully!");
        setIsModalOpen(false);

      } catch (error) {
        toast.error(error.response?.data?.message || "Password update failed. Check your current password.");
      } finally {
        setIsPasswordLoading(false);
      }
    };

    if(loading) {
      return <div className='text-center p-8'>Loading student profile...</div>;
    }

    if(!studentData) {
      return <div className='text-center p-8 text-red-600'>Could not retrieve user data.</div>;
    }

  return (
        <div className="bg-indigo-100 p-6 md:p-8 rounded-xl shadow-2xl mx-auto my-8">        
        {isModalOpen ? (
            <div>
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Profile
                </button>

                <PasswordUpdateModal 
                    onSave={handlePassowordChange}
                    isLoading={isPasswordLoading}
                    onClose={() => setIsModalOpen(false)} 
                />
            </div>
        ) : (
            
        <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <h1 className='text-3xl font-extrabold text-indigo-900 mb-6 border-b-2 border-indigo-200 pb-3 flex items-center'>
                👤 My Profile
            </h1>

            <div className='p-5 border border-violet-200 rounded-xl bg-white shadow-sm hover:shadow-md transition'>
                <h2 className='text-xl font-semibold mb-4 text-indigo-800 flex items-center border-b border-violet-100 pb-2'>
                  <FileText className="w-5 h-5 mr-2" />Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className='bg-violet-50 p-3 rounded-lg'>
                        <span className="text-xs text-gray-500 uppercase block mb-1">Name</span>
                        <div className='flex items-center text-gray-800 font-bold'>
                             <User className='w-4 h-4 text-indigo-600 mr-2'/> {studentData.name}
                        </div>
                    </div>
                    <div className='bg-violet-50 p-3 rounded-lg'>
                        <span className="text-xs text-gray-500 uppercase block mb-1">Student ID</span>
                        <div className='flex items-center text-gray-800 font-medium'>
                             <Hash className='w-4 h-4 text-indigo-600 mr-2'/> {studentData.studentId}
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition'>
                <h2 className='text-xl font-semibold mb-4 text-gray-800 flex items-center border-b border-gray-100 pb-2'>
                  <UserRoundCog className="w-5 h-5 mr-2" />Contact Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className='bg-gray-50 p-3 rounded-lg'>
                        <span className="text-xs text-gray-500 uppercase block mb-1">Email</span>
                        <div className='flex items-center text-gray-800'>
                             <Mail className='w-4 h-4 text-gray-600 mr-2'/> {studentData.email}
                        </div>
                    </div>
                    <div className='bg-gray-50 p-3 rounded-lg'>
                        <span className="text-xs text-gray-500 uppercase block mb-1">Phone</span>
                        <div className='flex items-center text-gray-800'>
                             <Phone className='w-4 h-4 text-gray-600 mr-2'/> {studentData.contact || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>

            <div className='p-6 border border-red-200 rounded-xl bg-white shadow-sm flex flex-col md:flex-row justify-between items-center gap-4'>
                <div>
                    <h2 className='text-xl font-semibold text-red-700 flex items-center space-x-2'>
                        <Lock className='w-5 h-5' /><span>Security Settings</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Update your password to keep your account safe.</p>
                </div>
                
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-200 font-medium w-full md:w-auto'
                >
                    Change Password
                </button>
            </div>
        </div>
        )}    </div>
  )
}

export default ProfilePage;