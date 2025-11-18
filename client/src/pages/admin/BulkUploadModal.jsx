import React, { useState } from 'react';
import { X, Upload, Loader2, FileText } from 'lucide-react';
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
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
                
                <div className='p-4 border-b flex justify-between items-center bg-green-50'>
                    <h3 className='text-xl font-bold text-green-700 flex items-center space-x-2'>
                        <Upload size={20} /> <span>Bulk Student Data Upload</span>
                    </h3>
                    <button onClick={onClose} className='text-gray-500 hover:text-gray-800 p-1'>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <p className="text-sm text-gray-600">
                        Upload a file containing new student records. The file **must be in CSV format** and include columns like **CollegeID, Name, Email, Year, etc.**
                    </p>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select CSV File</label>
                        <input
                            type="file"
                            name="studentDataFile"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={handleFileChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            required
                        />
                        {file && <p className="mt-1 text-xs text-green-600">Selected: {file.name}</p>}
                    </div>

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center items-center bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition disabled:bg-green-400 font-semibold"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={20} /> Uploading & Processing...
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