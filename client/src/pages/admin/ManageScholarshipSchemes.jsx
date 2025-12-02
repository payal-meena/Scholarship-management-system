import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PlusCircle, Edit, Trash2, Clock, CheckCircle, AlertTriangle, XCircle , ArrowLeft } from 'lucide-react'
import SchemeModal from './SchemeModal';
import { toast } from 'react-toastify';


// const initialSchemes = [
//     {id: 1, name: 'Central Sector Scholarship', deadline: "2025-31-10", fundAmount: "12,000", isActive: true, criteria: { minPercentage: 80, maxIncome: 250000, minStudyYear: '1st Year'} },
//     {id: 2, name: 'Post Metric Scholarship', deadline: "2025-31-12", fundAmount: "16,000", isActive: true,  criteria: { minPercentage: 50, maxIncome: 800000, minStudyYear: '2nd Year' } },
//     {id: 3, name: 'Gav Ki Beti Scholarship', deadline: "2025-31-11",fundAmount: "5,000", isActive: false, criteria: { minPercentage: 60, maxIncome: 100000, minStudyYear: '1st Year' } },
// ];

const ManageScholarshipSchemes = () => {
    const [schemes,setSchemes] = useState([]);
    const [loading,setLoading] = useState(true);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [schemeToEdit, setSchemeToEdit] = useState(null);


    const fetchSchemes = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get('http://localhost:4000/api/admin/schemes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSchemes(response.data);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch schemes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchemes();
    },[]);


    const handleSave = async (schemeData) => {
        try {
            const token = localStorage.getItem('adminToken');
            const method = schemeData._id ? 'put' : 'post';
            const url = schemeData._id ? `http://localhost:4000/api/admin/schemes/${schemeData._id}` : "http://localhost:4000/api/admin/schemes";

            const res = await axios({ method, url, data: schemeData, headers: { Authorization: `Bearer ${token}`} });

            toast.success(schemeData._id ? 'Scheme updated successfully!' : 'Scheme created successfully!');
            fetchSchemes();
            setIsModalOpen(false);
            setSchemeToEdit(null);

        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save scheme data.');
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this scheme? This cannot be undone.')) {
            try {
                const token = localStorage.getItem('adminToken');
                await axios.delete(`http://localhost:4000/api/admin/schemes/${id}`, { headers: { Authorization: `Bearer ${token}` } });
                toast.success('Scheme deleted!');
                fetchSchemes();
            } catch (error) {
                toast.error('Failed to delete scheme.');
            }
        }
    };

    const handleOpenModal = (scheme = null) => {
        setSchemeToEdit(scheme);
        setIsModalOpen(true);
    };

    const isSchemeOpen = (deadline, adminActiveStatus) => {
        if(!adminActiveStatus) {
            return false;
        }
        const today = new Date();
        const deadlineDate = new Date(deadline);
        return deadlineDate.setHours(23, 59, 59, 999) >= today.getTime();
    };

    const getAdminStatusDetails = (scheme) => {
        const deadlineDate = new Date(scheme.deadline);
        const today = new Date();

        const isOpen = isSchemeOpen(scheme.deadline, scheme.isActive);

        if (isOpen) {
            const diffTime = deadlineDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if(diffDays <= 0) {
                return { icon: Clock, classes: 'bg-red-100 text-red-700', text: 'Expired'};
            } else if (diffDays <= 7) {
                return { icon: AlertTriangle, classes: 'bg-yellow-100 text-yellow-700 ', text: `Closing Soon (${diffDays} days left)`};
            } else {
                return { icon: CheckCircle, classes: 'bg-green-100 text-green-700', text: `Active`};
            }
        } else {
            return { icon: XCircle, classes: 'bg-gray-100 text-gray-700', text: 'Inactive'};
        }
    }

    if(loading) {
        return <div className='p-8 text-center'>Loading scholarship schemes...</div>
    }

  return (
    <div className='p-6 bg-indigo-100 rounded-xl shadow-2xl'>

      {isModalOpen ? (
          <div className="max-w-4xl mx-auto">
                 <button 
                    onClick={() => setIsModalOpen(false)}
                    className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back to Schemes List
                </button>
                
                <SchemeModal 
                    schemeToEdit={schemeToEdit}
                    onClose={()=> setIsModalOpen(false)}
                    onSave={handleSave}
                />
            </div>
      ) : (
           <div className="animate-in fade-in duration-500">
                <div className='flex justify-between items-center mb-8 border-b border-indigo-200 pb-4'>
                    <div>
                        <h1 className='text-3xl font-extrabold text-indigo-900'>🎓 Manage Scholarships</h1>
                        <p className="text-gray-500 mt-1">Create, edit, and manage all scholarship programs.</p>
                    </div>
                    <button 
                        onClick={() => handleOpenModal()} 
                        className='cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl shadow-lg hover:opacity-90 transition flex items-center space-x-2 transform hover:scale-105 active:scale-95'
                    >
                        <PlusCircle className='w-5 h-5' />
                        <span>Create New Scheme</span>
                    </button>
                </div>

                <div className='overflow-x-auto pb-8'>
                    {schemes.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-indigo-100">
                            <h3 className="text-xl text-gray-400">No schemes found. Create one to get started.</h3>
                        </div>
                    ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {schemes.map((scheme) => {
                            const status = getAdminStatusDetails(scheme);
                            const StatusIcon = status.icon;

                            return (
                            <div
                                key={scheme._id}
                                className="bg-indigo-50 border-t-2 border-indigo-800 shadow-lg rounded-2xl p-6 hover:shadow-2xl hover:border-indigo-800 hover:border-t-4 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h2 className="text-xl font-bold text-gray-800 line-clamp-2" title={scheme.name}>
                                            {scheme.name}
                                        </h2>
                                        <button
                                            onClick={() => handleDelete(scheme._id)}
                                            className="text-red-600 p-2 rounded-full bg-red-50 hover:text-red-800 hover:bg-red-100 transition"
                                            title="Delete Scheme"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${status.classes}`}>
                                        <StatusIcon className="w-3 h-3 mr-1" />
                                        {status.text}
                                    </div>

                                    <div className="mt-6 space-y-3 bg-indigo-50/50 p-4 rounded-xl">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Deadline</span>
                                            <span className="font-semibold text-gray-800">
                                            {new Date(scheme.deadline).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Amount</span>
                                            <span className="font-bold text-indigo-700">
                                            ₹{scheme.fundAmount}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => handleOpenModal(scheme)}
                                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow hover:opacity-90 transition flex items-center justify-center space-x-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Edit Scheme</span>
                                    </button>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                    )}
                </div>
            </div>

      )}        
  </div>
  );
};

export default ManageScholarshipSchemes