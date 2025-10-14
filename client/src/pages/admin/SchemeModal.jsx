import React, { useState } from 'react';
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
    const [isLoadin,setisLoading] = useState(false);

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
        setisLoading(true);
        await new Promise(resolve => setTimeout(resolve,1000));

        onSave(formData);
        setisLoading(false);
    };

    return (
        <div>
            
        </div>
    )
}