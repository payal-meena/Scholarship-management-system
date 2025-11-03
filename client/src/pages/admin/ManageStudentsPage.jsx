import React, { useState, useEffect } from 'react';
import { Search, Users, Eye } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

// const initialStudents = [
//     { id: 101, name: "Rahul Sharma", email: "rahul@example.com", studentId: "S2024001",currentStudyYear: "2nd Year", applicationStatus: "Documents Missing", scheme: "Merit Grant" },
//     { id: 102, name: "Priya Singh", email: "priya@example.com", studentId: "S2024002",currentStudyYear: "1st Year", applicationStatus: "Application Complete", scheme: "Govt. Scheme B" }, // Add currentStudyYear property here" applicationStatus: "Application Complete", scheme: "Need-Based Aid" },
//     { id: 105, name: "Suresh Kumar", email: "suresh@example.com", studentId: "S2024005",currentStudyYear: "3rd Year", applicationStatus: "Not Started", scheme: "N/A" },
//     { id: 106, name: "Anjali Verma", email: "anjali@example.com", studentId: "S2024006",currentStudyYear: "2nd Year", applicationStatus: "Not Started", scheme: "N/A" },
//     { id: 103, name: "Mohan Das", email: "mohan@example.com", studentId: "S2024003",currentStudyYear: "3rd Year", applicationStatus: "Reverted for Correction", scheme: "Merit Grant" },
//     { id: 104, name: "Vikram Reddy", email: "vikram@example.com", studentId: "S2024004",currentStudyYear: "4th year", applicationStatus: "Application Complete", scheme: "Govt. Scheme A" },
// ];

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
    const [students, setStudents] = useState([]);
    const [loading,setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [yearFilter,setYearFilter] = useState("All");

    useEffect(() => {
        const fetchAllStudents = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                if (!token) throw new Error('Admin authentication required.');

                const response = await axios.get('http://localhost:4000/api/admin/students', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching student list:", error);
                toast.error(error.response?.data?.message || "Failed to load student records.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllStudents();
    }, []);

    const filteredStudents = students.filter(student => {

        const name = student.name || '';
        const id = student.studentId || '';

        const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              student.studentId.includes(searchTerm);
        const matchesStatus = statusFilter === 'All' || student.applicationStatus === statusFilter;
        const matchesYear = yearFilter === 'All' || student.currentStudyYear === yearFilter;
       
        return matchesSearch && matchesStatus && matchesYear;
    });

    if(loading) {
        return <div className='p-8 text-center'>Loading student records fro tracking...</div>;
    }
    const handleViewDetails = (studentId) => {
        alert(`Viewing complete record for Student ID: ${studentId}.`);
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
                    <option value="All">All</option>
                    <option value="Application Complete">Application Complete</option>
                    <option value="Documents Missing">Documents Missing</option>
                    <option value="Not Started">Application Not Started</option>
                    <option value="Reverted for Correction">Reverted for Correction</option>
                </select>

                <select
                    className="md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                >
                    <option value="All">All Years</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                </select>

            </div>

            <div className="overflow-x-auto bg-gray-50 rounded-lg border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Student Name & ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Year of Study</th>
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
                                        {student.name || 'N/A'} <br/>
                                        <span className="text-gray-500 text-xs">{student.email || 'N/A'}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                                        {student.currentStudyYear || 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(student.applicationStatus)}`}>
                                            {student.applicationStatus || 'N/A'}
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
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    No student records found matching your criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <p className="mt-6 text-sm text-gray-700 border-t pt-3">
                    This table now fetches live data and filters by status and year for university reporting.               </p>
        </div>
    );
};

export default ManageStudentsPage;