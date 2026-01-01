import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { X, Send, AlertTriangle, User, BookOpen, DollarSign, UploadCloud } from "lucide-react";

const formatDate = (dateString) => dateString ? dateString.substring(0, 10) : '';

const ReSubmitApplicationForm = ({ applicationId, initialData, onClose, onResubmitSuccess }) => {
    
    const [formData, setFormData] = useState({
        fullName: initialData.personalData?.fullName || '',
        dob: formatDate(initialData.personalData?.dob) || '',
        gender: initialData.personalData?.gender || '',
        contactNo: initialData.personalData?.contactNo || '',
        fullAddress: initialData.personalData?.fullAddress || '',
        samagraId: initialData.personalData?.samagraId || '',

        currentCourse: initialData.academicData?.currentCourse || '',
        currentBranch: initialData.academicData?.currentBranch || '',
        currentStudyYear: initialData.academicData?.currentStudyYear || '1st Year',
        cgpa: initialData.academicData?.cgpa || '',
        ten_perc: initialData.academicData?.ten_perc || '',
        twelve_perc: initialData.academicData?.twelve_perc || '',

        income: initialData.financialData?.income || '',
        fatherOccupation: initialData.personalData?.fatherOccupation || '',
        motherOccupation: initialData.personalData?.motherOccupation || '',

        schemeId: initialData.scheme?._id || initialData.scheme,
    });
    
    const [newFiles, setNewFiles] = useState({}); 
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewFiles(prev => ({ ...prev, [e.target.name]: e.target.files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requiredFields = ['fullName', 'dob', 'contactNo', 'currentCourse', 'income', 'ten_perc', 'twelve_perc', 'cgpa'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                toast.error(`Please fill the required field: ${field}`);
                return;
            }
        }

        setIsLoading(true);
        const formPayload = new FormData();

        Object.keys(formData).forEach(key => {
            formPayload.append(key, formData[key] || '');
        });
        
        Object.keys(newFiles).forEach(key => {
            formPayload.append(key, newFiles[key]);
        });

        formPayload.append('applicationId', applicationId); 
        formPayload.append('schemeId', formData.schemeId); 

        try {
            const token = localStorage.getItem('studentToken');
            
            const res = await axios.put(`http://localhost:4000/api/students/apply/${applicationId}`, formPayload, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.status === 200) {
                // toast.success("Application successfully re-submitted for review!"); // Parent handle karega
                onResubmitSuccess(res.data.application); 
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Re-submission failed. Server error.");
        } finally {
            setIsLoading(false);
            // onClose(); // Parent view switch karega
        }
    };
    
    const getFileName = (docKey) => {
        if (newFiles[docKey]) return `New File Selected: ${newFiles[docKey].name}`;
        const path = initialData.documentPaths ? initialData.documentPaths[docKey] : null;
        return path ? 'Current file exists' : 'File Missing';
    };

    const FileStatus = ({ fileKey }) => {
        const statusText = getFileName(fileKey);
        const color = statusText.includes('New') ? 'text-green-600' : statusText.includes('Missing') ? 'text-red-600' : 'text-blue-600';
        return <span className={`text-sm font-semibold ${color}`}>{statusText}</span>;
    };


    return (
        // REMOVED: fixed inset-0 bg-black... (Overlay Removed)
        // ADDED: Card Styles
        <div className="bg-white rounded-xl shadow-xl border border-indigo-100 overflow-hidden">
            
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center bg-indigo-50/50">
                <h2 className="text-2xl font-bold text-red-700 flex items-center space-x-2">
                    <AlertTriangle className="w-6 h-6" />
                    <span>Re-submission: {initialData.scheme?.name}</span>
                </h2>
                {/* Optional Close Button */}
                <button onClick={onClose} className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition">
                    <X size={24} />
                </button>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 mx-6 mt-6 rounded-r-lg">
                <p className="font-bold flex items-center"><AlertTriangle className="w-4 h-4 mr-2"/> Admin Feedback:</p>
                <p className="text-sm mt-1 ml-6">{initialData.adminFeedback || "Please review and correct the marked errors."}</p>
            </div>

            <form className="p-6 space-y-8" onSubmit={handleSubmit}>
                
                {/* Personal Info */}
                <div className="border p-6 rounded-xl bg-gray-50 border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2 border-b pb-2 border-gray-200">
                        <User className="w-5 h-5"/> <span>Personal & Contact Information</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-3">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Date of Birth *</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Gender *</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Contact Number *</label>
                            <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange} required maxLength="10"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Samagra ID</label>
                            <input type="text" name="samagraId" value={formData.samagraId} onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Full Permanent Address *</label>
                            <textarea name="fullAddress" value={formData.fullAddress} onChange={handleChange} required rows="2"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    </div>
                </div>

                {/* Academic Info */}
                <div className="border p-6 rounded-xl bg-indigo-50/30 border-indigo-100">
                    <h2 className="text-xl font-bold text-indigo-900 mb-6 flex items-center space-x-2 border-b pb-2 border-indigo-200">
                        <BookOpen className="w-5 h-5"/> <span>Academic Information</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-1">10th % *</label>
                            <input type="number" name="ten_perc" value={formData.ten_perc} onChange={handleChange} required step="0.01" max="100"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-1">12th % *</label>
                            <input type="number" name="twelve_perc" value={formData.twelve_perc} onChange={handleChange} required step="0.01" max="100"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Current Year *</label>
                            <select name="currentStudyYear" value={formData.currentStudyYear} onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 bg-white focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year (Final)</option>
                            </select>
                        </div>
                        <div className="col-span-1">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Last CGPA *</label>
                            <input type="number" name="cgpa" value={formData.cgpa} onChange={handleChange} required step="0.01"
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Course Name *</label>
                            <input type="text" name="currentCourse" value={formData.currentCourse} onChange={handleChange} required
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">Branch *</label>
                            <input type="text" name="currentBranch" value={formData.currentBranch} onChange={handleChange} required
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    </div>
                </div>

                {/* Financial Info */}
                <div className="border p-6 rounded-xl bg-green-50/30 border-green-100">
                    <h2 className="text-xl font-bold text-green-800 mb-6 flex items-center space-x-2 border-b pb-2 border-green-200">
                        <DollarSign className="w-5 h-5"/> <span>Financial Information</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Annual Income (₹) *</label>
                            <input type="number" name="income" value={formData.income} onChange={handleChange} required
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Father's Occupation</label>
                            <input type="text" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Mother's Occupation</label>
                            <input type="text" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm p-2.5 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    </div>
                </div>

                {/* Documents Upload */}
                <div className="border p-6 rounded-xl bg-red-50/30 border-red-100">
                    <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center space-x-2">
                        <UploadCloud className="w-5 h-5"/> <span>Re-upload Missing/Incorrect Documents</span>
                    </h2>
                    <p className='text-sm text-gray-700 mb-6'>Status: <strong className='text-red-700'>Reverted for Correction</strong>. You must re-upload any file where the Admin noted an error.</p>
                    
                    <div className="space-y-4">
                        {[
                            { label: "Passport Size Photo (JPG/PNG) *", name: "photoFile", accept: ".jpg,.jpeg,.png" },
                            { label: "Aadhaar Card *", name: "aadharFile", accept: ".pdf" },
                            { label: "Bank Passbook (First Page) *", name: "bankPassbookFile", accept: ".pdf" },
                            { label: "Caste Certificate *", name: "casteCertificateFile", accept: ".pdf" },
                            { label: "Domicile Certificate *", name: "domicileCertificateFile", accept: ".pdf" },
                            { label: "10th Marksheet *", name: "tenthMarksheetFile", accept: ".pdf" },
                            { label: "12th Marksheet *", name: "twelveMarksheetFile", accept: ".pdf" },
                            { label: "Latest Income Proof *", name: "incomeCertificateFile", accept: ".pdf" },
                            { label: "Last Year's Marksheet *", name: "lastYearMarksheetFile", accept: ".pdf" },
                        ].map((item) => (
                            <div key={item.name} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition">
                                <label className="text-sm font-bold text-gray-700 w-1/3">{item.label}</label>
                                <input type="file" name={item.name} accept={item.accept} onChange={handleFileChange} 
                                    className="mt-1 sm:mt-0 text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
                                <div className="w-1/4 text-right">
                                    <FileStatus fileKey={item.name} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={isLoading}
                        className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition disabled:bg-red-300 flex items-center shadow-lg shadow-red-200">
                        <Send className="w-5 h-5 mr-2"/> 
                        <span> {isLoading ? ' Re-submitting...' : ' Fix Errors & Re-submit'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReSubmitApplicationForm;