import React from 'react';
import { X } from 'lucide-react';

const ViewStudentModal = ({ isOpen, onClose, student }) => {
    if (!isOpen || !student) return null;

    const details = [
        { label: "College ID", value: student.collegeId },
        { label: "Course", value: student.course },
        { label: "Study Year", value: student.currentStudyYear },
        { label: "Status", value: student.applicationStatus },
        { label: "Scheme Applied", value: student.latestScheme || "N/A" },
        { label: "Contact No", value: student.contactNo || "N/A" }, // Assuming contactNo exists
    ];

    // Tailwind CSS classes for status (reuse your existing logic)
    const getStatusClasses = (status) => {
        switch (status) {
            case 'Application Complete': return 'bg-green-100 text-green-700';
            case 'Reverted for Correction': return 'bg-yellow-100 text-yellow-700';
            case 'Documents Missing': return 'bg-red-100 text-red-700';
            case 'Not Started': return 'bg-gray-200 text-gray-700';
            default: return 'bg-violet-200 text-violet-700';
        }
    };


    return (
        // Modal overlay
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300">
            {/* Modal content */}
            <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-1/2 lg:w-1/3 p-6 max-h-[90vh] overflow-y-auto transform scale-100 transition-transform duration-300">
                
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-indigo-800">Student Details: {student.name}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Basic Info */}
                    <p className="text-lg font-semibold text-indigo-700 border-b pb-2">{student.email}</p>
                    
                    {/* Detail Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {details.map((item) => (
                            <div key={item.label}>
                                <div className="text-sm font-medium text-gray-500">{item.label}</div>
                                {item.label === 'Status' ? (
                                    <span className={`mt-1 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(item.value)}`}>
                                        {item.value}
                                    </span>
                                ) : (
                                    <div className="text-base font-medium text-gray-800">{item.value}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t mt-4">
                        <h3 className="text-lg font-semibold text-indigo-700 mb-2">Application Documents</h3>
                        <p className='text-sm text-gray-600'> (Functionality to view or upload documents goes here) </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button 
                        onClick={onClose} 
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewStudentModal;