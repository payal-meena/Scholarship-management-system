import React, {useState , useEffect } from 'react'
import { User, Lock, Mail , Phone, Hash, ArrowLeft } from 'lucide-react'
import axios from 'axios';
import { toast } from "react-toastify";
import AdminPasswordUpdateModal from './AdminPasswordUpdateModal';

const AdminProfilePage = () => {

    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [isChangingPassword, setIsChangingPassword] = useState(false);
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
                toast.error(error.response?.data?.message || "Failed to load profile data.");
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
            setIsChangingPassword(false); // Success hone par wapas profile dikhao
        }   catch (error) {
            toast.error(error.response?.data?.message || "Password update failed. Check your current password.");
        }   finally {
            setIsPasswordLoading(false);
        }
    };

    if(loading) return <div className='text-center p-8'>Loading admin profile...</div>;
    if(!adminData) return <div className='text-center p-8 text-red-600'>Could not receive admin data.</div>;

  return (
    <div className='mx-auto p-6 bg-indigo-100 rounded-xl shadow-2xl min-h-[500px]'>
        
        {isChangingPassword ? (
            <div className="animate-in fade-in slide-in-from-right duration-300">
                <button 
                    onClick={() => setIsChangingPassword(false)}
                    className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Profile
                </button>

                <AdminPasswordUpdateModal
                    onSave={handlePasswordChange}
                    onClose={() => setIsChangingPassword(false)}
                    isLoading={isPasswordLoading}
                />
            </div>
        ) : (
            
        <div className='space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500'> 
            <h1 className='text-3xl font-extrabold text-indigo-900 mb-6 border-b pb-3 flex items-center'>
                <span>👨‍💼 Admin Profile</span>
            </h1>

            <div className='p-6 border border-indigo-100 rounded-xl bg-indigo-50/50 hover:shadow-md transition'>
                <h2 className='text-xl font-semibold mb-4 flex items-center space-x-2 text-indigo-800 border-b border-indigo-200 pb-2'>
                    <Hash className="w-5 h-5" /> Login Details
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <p className='flex flex-col p-3 bg-white rounded-lg border border-indigo-100'>
                        <span className="text-xs text-gray-500 uppercase font-bold">Name</span>
                        <span className="text-gray-800 font-medium flex items-center mt-1">
                            <User className='w-4 h-4 text-indigo-500 mr-2'/> {adminData.name || 'Admin User'}
                        </span>
                    </p>
                    <p className='flex flex-col p-3 bg-white rounded-lg border border-indigo-100'>
                        <span className="text-xs text-gray-500 uppercase font-bold">Role</span>
                        <span className="text-gray-800 font-medium flex items-center mt-1">
                            <Lock className='w-4 h-4 text-indigo-500 mr-2' /> Administrator
                        </span>
                    </p>
                </div>
            </div>

            <div className='p-6 border border-gray-200 rounded-xl bg-white hover:shadow-md transition'>
                <h2 className='text-xl font-semibold mb-4 text-gray-800 flex items-center border-b border-gray-100 pb-2'>
                    <Phone className="w-5 h-5 mr-2" /> Contact Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <p className='flex flex-col p-3 bg-gray-50 rounded-lg'>
                        <span className="text-xs text-gray-500 uppercase font-bold">Email</span>
                        <span className="text-gray-800 flex items-center mt-1">
                            <Mail className='w-4 h-4 text-gray-500 mr-2' /> {adminData.email}
                        </span>
                    </p>
                    <p className='flex flex-col p-3 bg-gray-50 rounded-lg'>
                        <span className="text-xs text-gray-500 uppercase font-bold">Contact</span>
                        <span className="text-gray-800 flex items-center mt-1">
                            <Phone className='w-4 h-4 text-gray-500 mr-2'/> {adminData.contact || 'N/A'}
                        </span>
                    </p>
                </div>
            </div>

            <div className='p-6 border border-red-200 rounded-xl bg-red-50 flex flex-col md:flex-row justify-between items-center gap-4'>
                <div>
                    <h2 className='text-xl font-semibold text-red-700 flex items-center space-x-2'>
                        <Lock className='w-5 h-5' /><span>Security Settings</span>
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">Regularly update your password to secure the admin panel.</p>
                </div>
                <button
                    onClick={() => setIsChangingPassword(true)}
                    className='bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition shadow-lg shadow-red-200 font-medium w-full md:w-auto'
                >
                    Change Password
                </button>
            </div>
        </div>
        )}
     </div>
  );
};

export default AdminProfilePage