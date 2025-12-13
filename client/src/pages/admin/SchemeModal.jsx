import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { X, Save, PlusCircle, FileText, Check } from 'lucide-react';

const SchemeModal = ({ schemeToEdit, onClose, onSave }) => {
    const initialState = schemeToEdit ? {
        ...schemeToEdit,
        fundAmount: schemeToEdit.fundAmount || 0,
        criteria: {
            ...schemeToEdit.criteria,
            minPercentage: schemeToEdit.criteria.minPercentage || 0,
            maxIncome: schemeToEdit.criteria.maxIncome || 0,
        }
    } : {
        name: '',
        deadline: '',
        fundAmount: 0, 
        isActive: true,
        criteria: {
            minPercentage: 0,
            maxIncome: 0,
            minStudyYear: '1st Year',
        }
    };
    const [formData, setFormData] = useState(initialState);
    const [isLoading,setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'minPercentage' || name === 'maxIncome' || name === 'minStudyYear') {
            setFormData(prev => ({
                ...prev,
                criteria: {
                    ...prev.criteria,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const fundAmountValue = formData.fundAmount;
        const minPercValue = formData.criteria.minPercentage;
        const maxIncomeValue = formData.criteria.maxIncome;

    const dataToSend = {
        ...formData,
        fundAmount: fundAmountValue ? Number(fundAmountValue) : null, 
        
        criteria: {
            ...formData.criteria,
            minPercentage: minPercValue ? Number(minPercValue) : null, 
            maxIncome: maxIncomeValue ? Number(maxIncomeValue) : null, 
        }
    };
    
   if (!dataToSend.name || !dataToSend.deadline || dataToSend.fundAmount <= 0) {
            alert("Scheme Name, Deadline, and Fund Amount must be filled with valid values.");
            setIsLoading(false);
            return;
        }
        
        onSave(dataToSend);
        setIsLoading(false);
        onClose();
    };

    return (
            <div className='bg-indigo-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300'>
            <div className='p-6 border-b border-gray-100 bg-indigo-50 flex justify-between items-center'>
                <div>
                    <h2 className='text-2xl font-bold text-indigo-900 flex items-center space-x-2'>
                        {schemeToEdit ? <div className='p-2 bg-indigo-100 rounded-lg'><Save className="w-6 h-6 text-indigo-600"/></div> 
                                      : <div className='p-2 bg-indigo-100 rounded-lg'><PlusCircle className="w-6 h-6 text-indigo-600"/></div>}
                        <span>{schemeToEdit ? 'Edit Scheme Details' : 'Create New Scheme'}</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 ml-12">Fill in the details to configure the scholarship scheme.</p>
                </div>
                <button onClick={onClose} className='text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition'>
                    <X size={24} />
                </button>
            </div>

            <form className='p-6 md:p-8 space-y-8' onSubmit={handleSubmit}>
                
                <div className="space-y-4">
                    <h3 className='text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center'>
                        <FileText className="w-4 h-4 mr-2" /> Scheme Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Scheme Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-indigo-500  outline-none transition" 
                                placeholder="e.g. Merit Cum Means Scholarship 2025"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Application Deadline</label>
                            <input type="date" name="deadline" value={formData.deadline ? formData.deadline.substring(0,10) : ''}  onChange={handleChange} required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fund Amount per Student (₹)</label>
                            <input type="number" name="fundAmount" value={formData.fundAmount} onChange={handleChange} required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-indigo-500 outline-none" 
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                <hr className="border-gray-100" />

                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center">
                        <Check className="w-4 h-4 mr-2" /> Eligibility Criteria
                    </h3>
                    <div className="bg-indigo-50 border border-gray-300 rounded-xl p-5 grid md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Min. Percentage Required</label>
                            <input type="number" name="minPercentage" value={formData.criteria.minPercentage} onChange={handleChange} step="0.01"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-yellow-500 outline-none bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max. Family Income (₹)</label>
                            <input type="number" name="maxIncome" value={formData.criteria.maxIncome} onChange={handleChange} required
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-yellow-500 outline-none bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Year of Study</label>
                            <select name="minStudyYear" value={formData.criteria.minStudyYear} onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-yellow-500 outline-none bg-white">
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                        />
                        <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer select-none">
                            Make Scheme Active
                        </label>
                    </div>

                    <div className="flex space-x-3">
                        <button type="button" onClick={onClose} className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading}
                            className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition shadow-lg shadow-indigo-200 disabled:opacity-70 flex items-center">
                            {isLoading ? 'Saving...' : (schemeToEdit ? 'Update Scheme' : 'Create Scheme')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
       
    );
};

export default SchemeModal;