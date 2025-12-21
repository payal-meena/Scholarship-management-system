import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const CustomDropdown = ({ label, options, value, onChange, placeholder = "Select an option" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        onChange({ target: { name: label, value: option } }); 
        setIsOpen(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">{label}</label>}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between p-3 border rounded-lg bg-indigo-50 transition-all duration-200 outline-none border-indigo-300
                    ${isOpen ? 'border-indigo-500 ring-2 ring-indigo-100' : 'border-gray-300 '}`}
            >
                <span className={`block truncate ${!value ? 'text-gray-400' : 'text-gray-800'}`}>
                    {value || placeholder}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-indigo-100 rounded-lg shadow-xl max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-200">
                    <ul className="py-1">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className={`group flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-colors
                                    ${value === option 
                                        ? 'bg-indigo-50 text-indigo-700 font-medium' 
                                        : 'text-gray-700 hover:bg-indigo-500 hover:text-white' 
                                    }`}
                            >
                                <span>{option}</span>
                                {value === option && <Check className="w-4 h-4 text-indigo-600 group-hover:text-white" />}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;