import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

const PasswordUpdateModal = ({ onClose, onSave }) => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(passwordData); 
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in-0 zoom-in-95'>

                    <div className='p-4 border-b flex justify-between items-center bg-red-50'>
                        <h3 className='text-xl font-bold text-red-700 flex items-center space-x-2'>
                            <Lock className=" w-5 h-5" /> <span>Change Password</span>
                        </h3>
                        <button className='text-gray-500 hover:text-gray-800 p-1 rounded-full hover:bg-red-100 transition'
                            onClick={onClose}
                        >
                            <X size={24}/>
                        </button>
                    </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={passwordData.currentPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 transition "
                        required
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password (min 6 chars)"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 transition "
                        required
                        minLength="6"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 transition "
                        required
                    />

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:bg-red-400"
                    >
                        {isLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PasswordUpdateModal;