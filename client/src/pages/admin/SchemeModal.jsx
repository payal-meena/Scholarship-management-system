import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { X, Save, PlusCircle } from 'lucide-react';

const SchemeModal = ({ schemeToEdit, onClose, onSave }) => {
    const initialState = schemeToEdit || {
        name: '',
        deadline: '',
        fundAmount: '',
        isActive: true,
        criteria: {
            minPercentage: '',
            maxIncome: '',
            minStudyYear: '1st Year',
        }
    };
    const [formData, setFormData] = useState(initialState);
    const [isLoading,setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name in formData.criteria) {
            setFormData(prev => ({
                ...prev,
                criteria: {
                    ...prev, [name]: value 
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.name || !formData.deadline || !formData.fundAmount || !formData.criteria.minPercentage ) {
            toast.error("Please fill all scheme details and criteria.");
            return;
        }
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve,1000));

        onSave(formData);
        setIsLoading(false);
    };

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
            <div className='bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl'>

                    <div className='p-6 border-b flex justify-between items-center'>
                        <h2 className='text-2xl font-bold text-gray-800 flex items-center space-x-2 '>
                            {schemeToEdit ? <Save /> : <PlusCircle />}
                            <span>{schemeToEdit ? 'Edit Scheme' : 'Create New Scheme'}</span>
                        </h2>
                        <button onClick={onClose} className='text-gray-500 hover:text-gray-800 p-2'>
                            <X size={24} />
                        </button>
                    </div>

                    <form className='p-6 space-y-6' onSubmit={handleSubmit}>
                        <div className='border p-4 rounded-lg bg-gray-50 space-y-4'>
                                <h3 className='text-lg font-semibold text-gray-700'>Scheme Details</h3>
                                <div>
                            <label className="block text-sm font-medium text-gray-700">Scheme Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                className="mt-1 w-full border rounded-md p-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deadline</label>
                                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required
                                    className="mt-1 w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fund Amount (₹)</label>
                                <input type="number" name="fundAmount" value={formData.fundAmount} onChange={handleChange} required
                                    className="mt-1 w-full border rounded-md p-2" />
                            </div>
                        </div>
                    </div>

                    <div className="border p-4 rounded-lg bg-yellow-50 space-y-4">
                        <h3 className="text-lg font-semibold text-yellow-800">Eligibility Criteria</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Minimum Percentage</label>
                                <input type="number" name="minPercentage" value={formData.criteria.minPercentage} onChange={handleChange} required step="0.01"
                                    className="mt-1 w-full border rounded-md p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Max Family Income (₹)</label>
                                <input type="number" name="maxIncome" value={formData.criteria.maxIncome} onChange={handleChange} required
                                    className="mt-1 w-full border rounded-md p-2" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Minimum Year of Study</label>
                            <select name="minStudyYear" value={formData.criteria.minStudyYear} onChange={handleChange}
                                className="mt-1 w-full border rounded-md p-2">
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Scheme is Active</label>
                    </div>

                    <button type="submit" disabled={isLoading}
                        className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:bg-indigo-400">
                        {isLoading ? 'Saving...' : (schemeToEdit ? 'Update Scheme' : 'Create Scheme')}
                    </button>
                    </form>
            </div>
        </div>
    );
};

export default SchemeModal;