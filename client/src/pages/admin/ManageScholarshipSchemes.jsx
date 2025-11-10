import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { PlusCircle, Edit, Trash2, Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
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
            return { icon: XCircle, classes: 'bg-gray-100 text-gray700', text: 'Inactive'};
        }
    }

    if(loading) {
        return <div className='p-8 text-center'>Loading scholarship schemes...</div>
    }

  return (
    <div className='p-6 bg-white rounded-xl shadow-lg'>
        <div className='flex justify-between items-center mb-6 border-b pb-2'>
            <h1 className='text-3xl font-extrabold text-indigo-900'>Manage Scholarships</h1>
            <button onClick={() => handleOpenModal()} className='cursor-pointer bg-violet-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-violet-800'>
                <PlusCircle className='w-5 h-5' />
                <span>Create New Scheme</span>
            </button>
        </div>

        <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Scheme Name</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Deadline</th>
                        {/* <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Min Percentage</th> */}
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {schemes.map((scheme) =>{
                        const statusDetails = getAdminStatusDetails(scheme);
                    return (
                        <tr key={scheme._id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{scheme.name} <br /> 
                        <span className='text-xs text-gray-500'>ID: {scheme._id} </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{new Date(scheme.deadline).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })}</td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Min Perc: {scheme.criteria.minPercentage}
                         </td> */}
                        <td className='px-6 py-4 whitespace-nowrap'>
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusDetails.classes}`}>
                                <statusDetails.icon className='w-4 h-4 mr-1' /> {statusDetails.text} 
                            </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                            <button onClick={()=> handleOpenModal(scheme)} className='cursor-pointer text-violet-600 hover:text-violet-900 flex items-center space-x-1'>
                                <Edit className='w-4 h-4 inline' />
                            </button>
                            <button 
                                onClick={()=> handleDelete(scheme._id)}
                                className='cursor-pointer text-red-600 hover:text-red-900'
                            >
                                <Trash2 className='w-4 h-4 inline' />
                            </button>
                        </td>
                    </tr>
                    )
             })}
                </tbody>
            </table>
        </div>

        {isModalOpen && (
            <SchemeModal 
            schemeToEdit={schemeToEdit}
            onClose={()=> setIsModalOpen(false)}
            onSave={handleSave}
            />
        )}
    </div>
  );
};

export default ManageScholarshipSchemes