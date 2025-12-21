import React, { useState } from 'react';
import { Lock, X , Save} from 'lucide-react';

const PasswordUpdateModal = ({ onClose, onSave, isLoading }) => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    // const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(passwordData); 
    };

    return (
        <div className='bg-indigo-100 rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-300'>
            
            {/* Header Styling */}
            <div className='p-6 border-b border-gray-100 bg-gray-50'>
                <h3 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
                    <Lock className="text-red-600 w-6 h-6" /> 
                    Change Password
                </h3>
                <p className="text-gray-500 mt-1 ml-8">
                    Please enter your current password to set a new one.
                </p>
            </div>
            
            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                        placeholder="Enter your old password"
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                            placeholder="Minimum 6 characters"
                            required
                            minLength="6"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-gray-50 focus:bg-white"
                            placeholder="Re-type new password"
                            required
                        />
                    </div>
                </div>

                <div className="pt-4 flex items-center justify-end space-x-4 border-t border-gray-100 mt-4">
                    <button 
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition disabled:bg-red-400 flex items-center shadow-lg shadow-red-100"
                    >
                        {isLoading ? (
                            <>Updating...</>
                        ) : (
                            <><Save className="w-5 h-5 mr-2" /> Update Password</>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PasswordUpdateModal;