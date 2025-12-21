import React, { useState, useEffect } from 'react';
import { Save, X, UserCog } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditStudentModal = ({ student, onClose, onSaveSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNo: '',
        course: '',
        currentStudyYear: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name || '',
                email: student.email || '',
                contactNo: student.contactNo || '',
                course: student.course || '',
                currentStudyYear: student.currentStudyYear || ''
            });
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem('adminToken');            
            await axios.put(`http://localhost:4000/api/admin/students/${student.id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onSaveSuccess(); 
        } catch (error) {
            console.error("Update failed", error);
            toast.error(error.response?.data?.message || "Failed to update student.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!student) return null;

    return (
        <div className="bg-indigo-100 rounded-xl shadow-2xl border border-indigo-100 overflow-hidden">
            <div className='p-6 border-b flex justify-between items-center'>
                <h3 className='text-2xl font-bold text-indigo-900 flex items-center space-x-2'>
                    <UserCog className="w-6 h-6" /> <span>Edit Student Record</span>
                </h3>
                <button onClick={onClose} className='text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-50 transition'>
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input 
                            type="text" name="name" value={formData.name} onChange={handleChange} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                        <input 
                            type="email" name="email" value={formData.email} onChange={handleChange} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number</label>
                        <input 
                            type="text" name="contactNo" value={formData.contactNo} onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Course</label>
                        <input 
                            type="text" name="course" value={formData.course} onChange={handleChange} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Current Year</label>
                        <select 
                            name="currentStudyYear" value={formData.currentStudyYear} onChange={handleChange} required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        >
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">College ID (Read-only)</label>
                        <input 
                            type="text" value={student.collegeId} disabled
                            className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg text-gray-500 cursor-not-allowed"
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
                        className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition disabled:opacity-70 flex items-center shadow-lg shadow-indigo-200"
                    >
                        {isLoading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditStudentModal;