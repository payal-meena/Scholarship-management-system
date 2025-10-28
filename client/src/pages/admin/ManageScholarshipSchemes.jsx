import React, { useState } from 'react'
import { PlusCircle, Edit, Trash2, Clock, CheckCircle } from 'lucide-react'
import SchemeModal from './SchemeModal';

const initialSchemes = [
    {id: 1, name: 'Central Sector Scholarship', deadline: "2025-31-10", fundAmount: "12,000", isActive: true, criteria: { minPercentage: 80, maxIncome: 250000, minStudyYear: '1st Year'} },
    {id: 2, name: 'Post Metric Scholarship', deadline: "2025-31-12", fundAmount: "16,000", isActive: true,  criteria: { minPercentage: 50, maxIncome: 800000, minStudyYear: '2nd Year' } },
    {id: 3, name: 'Gav Ki Beti Scholarship', deadline: "2025-31-11",fundAmount: "5,000", isActive: false, criteria: { minPercentage: 60, maxIncome: 100000, minStudyYear: '1st Year' } },
];

const ManageScholarshipSchemes = () => {
    const [schemes,setSchemes] = useState(initialSchemes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [schemeToEdit, setSchemeToEdit] = useState(null);

    const handleSave = (newSchemeData) => {
        if(newSchemeData.id) {
            setSchemes(schemes.map(s => s.id === newSchemeData.id ? newSchemeData : s));
        } else {
            const newId = Math.max(...schemes.map(s => s.id)) + 1;
            setSchemes([...schemes, { ...newSchemeData, id: newId }]);
        }
        setIsModalOpen(false);
        setSchemeToEdit(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this scheme?")) {
            setSchemes(schemes.filter(s => s.id !== id));
        }
    };

    const handleOpenModal = (scheme = null) => {
        setSchemeToEdit(scheme);
        setIsModalOpen(true);
    };

  return (
    <div className='p-6 bg-white rounded-xl shadow-lg'>
        <div className='flex justify-between items-center mb-6 border-b pb-2'>
            <h1 className='text-3xl font-extrabold text-gray-800'>Manage Schemes</h1>
            <button onClick={() => handleOpenModal()} className='cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700'>
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
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Min Percentage</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                        <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {schemes.map((scheme) => (
                        <tr key={scheme.id}>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{scheme.name} <br /> 
                        <span className='text-xs text-gray-500'>ID: {scheme.id} </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{scheme.deadline}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    Min Perc: {scheme.criteria.minPercentage}
                         </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${scheme.isActive ? 'bg-indigo-100 text-indigo-800' : 'bg-red-100 text-red-800'}`}>
                                {scheme.isActive ? <CheckCircle className='w-4 h-4 mr-1' /> : <Clock className='w-4 h-4 mr-1'/>} {scheme.isActive ? 'Active' : 'Inactive'}
                         </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                            <button onClick={()=> handleOpenModal(scheme)} className='cursor-pointer text-indigo-600 hover:text-indigo-900 flex items-center space-x-1'>
                                <Edit className='w-4 h-4 inline' />
                            </button>
                            <button 
                                onClick={()=> handleDelete(scheme.id)}
                                className='cursor-pointer text-red-600 hover:text-red-900'
                            >
                                <Trash2 className='w-4 h-4 inline' />
                            </button>
                        </td>
                    </tr>
                    ))}
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
  )
}

export default ManageScholarshipSchemes