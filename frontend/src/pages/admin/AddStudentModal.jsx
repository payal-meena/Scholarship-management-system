import React, { useState } from 'react';
import { UserPlus, X, Save, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddStudentModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', 
        collegeId: '',
        contactNo: '',
        course: '',
        currentStudyYear: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.collegeId || !formData.email || !formData.password) {
            toast.error("Please fill all required fields.");
            setIsLoading(false);
            return;
        }

        try {
            const token = localStorage.getItem('adminToken');
            
            await axios.post('http://localhost:4000/api/admin/students', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("New student added successfully!");
            onSuccess();
        } catch (error) {
            console.error("Add Student Error:", error);
            toast.error(error.response?.data?.message || "Failed to add student.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-indigo-100 rounded-xl shadow-2xl border border-indigo-100 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className='p-6 border-b flex justify-between items-center'>
                <h3 className='text-2xl font-bold text-indigo-900 flex items-center space-x-2'>
                    <UserPlus className="w-6 h-6" /> <span>Add New Student</span>
                </h3>
                <button onClick={onClose} className='text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-50 transition'>
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className='text-red-500'>*</span></label>
                        <input 
                            type="text" name="name" value={formData.name} onChange={handleChange} required
                            placeholder="e.g. Rahul Sharma"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">College ID / Enrollment No <span className='text-red-500'></span></label>
                        <input 
                            type="text" name="collegeId" value={formData.collegeId} onChange={handleChange}
                            placeholder="e.g. S2024001"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address <span className='text-red-500'>*</span></label>
                        <input 
                            type="email" name="email" value={formData.email} onChange={handleChange} required
                            placeholder="student@college.edu"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Default Password <span className='text-red-500'>*</span></label>
                        <input 
                            type="password" name="password" value={formData.password} onChange={handleChange} required
                            placeholder="Create a strong password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Course / Branch</label>
                        <input 
                            type="text" name="course" value={formData.course} onChange={handleChange} required
                            placeholder="e.g. B.Tech CS"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Current Year</label>
                        <select 
                            name="currentStudyYear" value={formData.currentStudyYear} onChange={handleChange} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition "
                        >
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number</label>
                        <input 
                            type="text" name="contactNo" value={formData.contactNo} onChange={handleChange}
                            placeholder="e.g. 9876543210"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                    <button 
                        type="button" onClick={onClose}
                        className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" disabled={isLoading}
                        className="px-8 py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition disabled:opacity-70 flex items-center shadow-lg shadow-green-200"
                    >
                        {isLoading ? (
                            <> <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding... </>
                        ) : (
                            <> <Save className="w-4 h-4 mr-2" /> Create Student </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddStudentModal;