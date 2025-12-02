import React, { useState } from 'react';
import { Lock, Save } from 'lucide-react';

const AdminPasswordUpdateModal = ({ onSave, onClose, isLoading }) => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(passwordData);
    };

    return (
        <div className='bg-indigo-100 rounded-xl border border-gray-200 shadow-2xl overflow-hidden'>
             
             {/* Header */}
            <div className='p-6 border-b border-gray-100 bg-gray-50'>
                <h3 className='text-2xl font-bold text-gray-800 flex items-center space-x-2'>
                    <Lock className="text-red-600 w-6 h-6" /> <span>Update Password</span>
                </h3>
                <p className="text-gray-500 mt-1 ml-8">Enter your current credentials to set a new password.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                        type="password"
                        name="currentPassword"
                        placeholder="Enter current password"
                        value={passwordData.currentPassword}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white"
                        required
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Min 6 characters"
                            value={passwordData.newPassword}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white"
                            required
                            minLength="6"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Re-enter new password"
                            value={passwordData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition bg-gray-50 focus:bg-white"
                            required
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end space-x-4 border-t border-gray-100 mt-4">
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
                        {isLoading ? 'Updating...' : <><Save className="w-5 h-5 mr-2"/> Update Password</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPasswordUpdateModal;