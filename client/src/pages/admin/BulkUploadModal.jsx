import React, { useState } from 'react';
import { X, Upload, Loader2, FileSpreadsheet } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BulkUploadModal = ({ onClose, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("Please select a CSV/Excel file to upload.");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('studentsDataFile', file); 

        try {
            const token = localStorage.getItem('adminToken');
            
            const res = await axios.post('http://localhost:4000/api/admin/students/bulk-upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            toast.success(res.data.message || "Bulk data upload completed.");
            onUploadSuccess(); 
        } catch (error) {
            console.error("Bulk Upload Error:", error);
            const serverMsg = error.response?.data?.message || "Error processing file on server.";
            toast.error(serverMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-indigo-100 rounded-xl shadow-2xl border border-indigo-100 overflow-hidden">
            <div className='p-6 border-b flex justify-between items-center bg-indigo-50'>
                <div>
                    <h3 className='text-2xl font-bold text-indigo-900 flex items-center space-x-2'>
                        <FileSpreadsheet className="w-8 h-8 text-indigo-900" /> 
                        <span>Bulk Data Upload</span>
                    </h3>
                    <p className="text-indigo-700 text-sm mt-1">Import multiple student records instantly via CSV.</p>
                </div>
                <button onClick={onClose} className='text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-50 transition'>
                    <X size={24} />
                </button>
            </div>
            <div className="grid md:grid-cols-2">
                
                <div className="p-8 bg-indigo-50 border-r border-indigo-100">
                    <h4 className="font-semibold text-gray-800 mb-4">Instructions:</h4>
                    <ul className="space-y-3 text-sm text-gray-600 list-disc list-inside">
                        <li>File must be in <strong>.CSV</strong> format.</li>
                        <li>Ensure columns match: <strong>Name, Email, StudentID, Course, Year</strong>.</li>
                        <li>Do not include header rows with special characters.</li>
                        <li>Maximum file size: 5MB.</li>
                    </ul>
                    <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100">
                        <strong>💡 Tip:</strong> Download the sample template before uploading to avoid errors.
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6 flex flex-col justify-center">
                    
                    <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center hover:bg-indigo-50 transition cursor-pointer relative">
                        <input
                            type="file"
                            name="studentDataFile"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            required
                        />
                        <Upload className="w-12 h-12 text-indigo-300 mx-auto mb-3" />
                        <p className="text-gray-700 font-medium">Click to select file</p>
                        <p className="text-xs text-gray-400 mt-1">or drag and drop here</p>
                        {file && (
                            <div className="mt-4 p-2 bg-indigo-100 text-indigo-800 rounded text-sm font-semibold inline-block">
                                Selected: {file.name}
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-bold shadow-lg shadow-indigo-200"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={20} /> Processing...
                            </>
                        ) : (
                            'Upload & Sync Records'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BulkUploadModal;