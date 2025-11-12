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
        <div className='fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4'>
            <div className='bg-white rounded-xl w-full max-w-md shadow-2xl'>
                
                <div className='p-4 border-b flex justify-between items-center'>
                    <h3 className='text-xl font-bold text-red-700 flex items-center space-x-2'>
                        <Lock className='w-5 h-5' /> <span>Change Password</span>
                    </h3>
                    <button onClick={onClose} className='text-gray-500 hover:text-gray-800 p-1'>
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Current Password"
                        value={passwordData.currentPassword}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
                        required
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password (min 6 chars)"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
                        required
                        minLength="6"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md"
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