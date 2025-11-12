import React, {useState , useEffect } from 'react'
import { User, Lock, Mail , Phone, Hash} from 'lucide-react'
import axios from 'axios';
import { toast } from "react-toastify";
import AdminPasswordUpdateModal from './AdminPasswordUpdateModal';

const AdminProfilePage = () => {

    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false); 
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                if(!token) throw new Error('No authentication token found.');

                const response = await axios.get('http://localhost:4000/api/admin/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                setAdminData(response.data);
            } catch (error) {
                console.error("Error fetching admin profile:", error);
                toast.error(error.response?.data?.message || "Failed to load profile data.Please login again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    },[])
    const handlePasswordChange = async(passwordData) => {
        const { currentPassword, newPassword, confirmPassword } = passwordData;

        if(!currentPassword || !newPassword || newPassword !== confirmPassword || newPassword.length < 6) {
            toast.error("Please check passwords: must match, be filled, and be min 6 chars.");
            return;
        } 

        setIsPasswordLoading(true);

        try {
            const token = localStorage.getItem('adminToken');

            const response = await axios.put('http://localhost:4000/api/admin/password-change', {
                currentPassword,
                newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}` 
                },
            });

            toast.success(response.data.message || "Password updated successfully!");
            setIsModalOpen(false);
        }   catch (error) {
            toast.error(error.response?.data?.message || "Password update failed. Check your current password.");
        }   finally {
            setIsPasswordLoading(false);
        }
    };

    if(loading) {
        return <div className='text-center p-8'>Loading admin profile...</div>;
    }

    if(!adminData) {
        return <div className='text-center p-8 text-red-600'>Could not receive admin data.</div>;
    }

  return (
    <div className='p-6 bg-white rounded-xl shadow-lg mx-auto'>
        <h1 className='text-3xl font-extrabold text-indigo-900 mb-6 border-b pb-3 flex items-center'>
            <User className='w-7 h-7 mr-3'/><span>Admin Profile</span>
        </h1>

        <div className='space-y-6'> 
            <div className='p-4 border rounded-md'>
                <h2 className='text-xl font-semibold mb-3 flex items-center space-x-2 text-indigo-800'>Login Details</h2>
                <p className='flex items-center text-gray-700 space-x-2'>
                    <User className='w-4 h-4 text-indigo-800'/> 
                    <span>Name: <strong>{adminData.name || 'Admin User'}</strong></span>
                </p>
                <p className='text-gray-700 flex items-center space-x-2 mt-2'>
                    <Hash className='w-4 h-4 text-indigo-800' />
                    <span>Role : Administrator</span>
                </p>
            </div>

            <div className='p-4 border border-gray-200 rounded-lg bg-gray-50'>
                <h2 className='text-xl font-semibold mb-3 text-gray-800'>Login & Contact</h2>
                <p className='flex items-center text-gray-700 space-x-2'>
                    <Mail className='w-4 h-4 text-gray-600' />
                    <span>Email : {adminData.email}</span>
                </p>
                <p className='flex items-center text-gray-700 space-x-2 mt-2'>
                    <Phone className='w-4 h-4 text-gray-600'/>
                    <span>Contact : {adminData.contact || 'N/A'}</span>
                </p>
            </div>

            <div className='p-4 border border-red-200 rounded-lg bg-red-50/50 flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-red-700 flex items-center space-x-2'>
                    <Lock className='w-5 h-5' /><span>Security Settings</span>
                </h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition'
                >
                    Change Password
                </button>
            </div>

            {isModalOpen && (
              <AdminPasswordUpdateModal
                onSave={handlePasswordChange}
                onClose={() => setIsModalOpen(false)}
                isLoading={isPasswordLoading}
              />
            )}
        </div>
     </div>
  );
};

export default AdminProfilePage