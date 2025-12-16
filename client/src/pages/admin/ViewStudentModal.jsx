import React from 'react';
import { User, Mail, Phone, BookOpen, Hash, Calendar, X } from 'lucide-react';
const ViewStudentModal = ({ onClose, student }) => {
    if (!student) return null;

    // const details = [
    //     { label: "College ID", value: student.collegeId },
    //     { label: "Course", value: student.course },
    //     { label: "Study Year", value: student.currentStudyYear },
    //     { label: "Status", value: student.applicationStatus },
    //     { label: "Scheme Applied", value: student.latestScheme || "N/A" },
    //     { label: "Contact No", value: student.contactNo || "N/A" }, 
    // ];

    // const getStatusClasses = (status) => {
    //     switch (status) {
    //         case 'Application Complete': return 'bg-green-100 text-green-700';
    //         case 'Reverted for Correction': return 'bg-yellow-100 text-yellow-700';
    //         case 'Documents Missing': return 'bg-red-100 text-red-700';
    //         case 'Not Started': return 'bg-gray-200 text-gray-700';
    //         default: return 'bg-violet-200 text-violet-700';
    //     }
    // };


    return (
            <div className="bg-indigo-50 rounded-xl shadow-xl border border-indigo-100 overflow-hidden">
                
                <div className="p-6 border-b bg-indigo-50 flex justify-between items-center">
                <h3 className='text-2xl font-bold text-indigo-900 flex items-center space-x-2'>
                    <User className="w-6 h-6" /> <span>Student Details</span>
                </h3>
                <button onClick={onClose} className='text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-50 transition'>
                    <X size={24} />
                </button>
            </div>

            <div className="p-8">
                <div className="grid md:grid-cols-2 gap-6">
                    
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Personal Info</h4>
                        
                        <div className="flex items-start space-x-3">
                            <User className="w-5 h-5 text-indigo-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-500 font-bold">Full Name</p>
                                <p className="text-gray-800 font-medium text-lg">{student.name}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <Hash className="w-5 h-5 text-indigo-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-500 font-bold">College ID</p>
                                <p className="text-gray-800 font-medium">{student.collegeId}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b pb-2 mb-4">Academic & Contact</h4>
                        
                        <div className="flex items-start space-x-3">
                            <BookOpen className="w-5 h-5 text-indigo-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-500 font-bold">Course & Year</p>
                                <p className="text-gray-800 font-medium">{student.course} ({student.currentStudyYear})</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <Mail className="w-5 h-5 text-indigo-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-500 font-bold">Email Address</p>
                                <p className="text-gray-800 font-medium">{student.email}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <Phone className="w-5 h-5 text-indigo-400 mt-0.5" />
                            <div>
                                <p className="text-xs text-gray-500 font-bold">Phone Number</p>
                                <p className="text-gray-800 font-medium">{student.contactNo || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-500 font-bold uppercase">Application Status</p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1
                            ${student.applicationStatus === 'Application Complete' ? 'bg-green-100 text-green-800' : 
                              student.applicationStatus === 'Documents Missing' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'}`}>
                            {student.applicationStatus || 'Not Started'}
                        </span>
                    </div>
                </div> */}
                </div>
            </div>
      
    );
};

export default ViewStudentModal;