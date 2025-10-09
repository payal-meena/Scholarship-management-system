import React, { useState } from 'react';
import { Search, Users, Eye } from 'lucide-react';

const initialStudents = [
    { id: 101, name: "Rahul Sharma", email: "rahul@example.com", studentId: "S2024001", applicationStatus: "Documents Missing", scheme: "Merit Grant" },
    { id: 102, name: "Priya Singh", email: "priya@example.com", studentId: "S2024002", applicationStatus: "Application Complete", scheme: "Need-Based Aid" },
    { id: 105, name: "Suresh Kumar", email: "suresh@example.com", studentId: "S2024005", applicationStatus: "Not Started", scheme: "N/A" },
    { id: 106, name: "Anjali Verma", email: "anjali@example.com", studentId: "S2024006", applicationStatus: "Not Started", scheme: "N/A" },
    { id: 103, name: "Mohan Das", email: "mohan@example.com", studentId: "S2024003", applicationStatus: "Reverted for Correction", scheme: "Merit Grant" },
    { id: 104, name: "Vikram Reddy", email: "vikram@example.com", studentId: "S2024004", applicationStatus: "Application Complete", scheme: "Govt. Scheme A" },
];

const getStatusClasses = (status) => {
    switch (status) {
        case 'Application Complete': return 'bg-green-100 text-green-700';
        case 'Reverted for Correction': return 'bg-yellow-100 text-yellow-700';
        case 'Documents Missing': return 'bg-red-100 text-red-700';
        case 'Not Started': return 'bg-gray-200 text-gray-700';
        default: return 'bg-blue-100 text-blue-700';
    }
};

const ManageStudentsPage = () => {
    const [students, setStudents] = useState(initialStudents);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              student.studentId.includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || student.applicationStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleViewDetails = (studentId) => {
        alert(`Viewing complete details for Student ID: ${studentId}`);
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2 flex items-center">
                <Users className="w-8 h-8 mr-3 text-indigo-600" /> All Student Records
            </h1>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Student Name or ID..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    className="md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">Filter by Status (All)</option>
                    <option value="Application Complete">Application Complete</option>
                    <option value="Documents Missing">Documents Missing</option>
                    <option value="Not Started">Application Not Started</option>
                    <option value="Reverted for Correction">Reverted for Correction</option>
                </select>
            </div>

            <div className="overflow-x-auto bg-gray-50 rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Student Name & Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Application Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Scheme Applied</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {student.name} <br/>
                                        <span className="text-gray-500 text-xs">{student.email}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(student.applicationStatus)}`}>
                                            {student.applicationStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.scheme || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button 
                                            onClick={() => handleViewDetails(student.studentId)}
                                            className="text-indigo-600 hover:text-indigo-900 text-xs font-bold flex items-center space-x-1"
                                        >
                                            <Eye className='w-4 h-4' /> <span>View Record</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                    No student records found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageStudentsPage;