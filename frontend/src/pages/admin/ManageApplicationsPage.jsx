import React, { useState, useEffect } from "react";
import { Search, CheckCircle, XCircle, ArrowLeft } from "lucide-react"; 
import ApplicationDetailModal from "./ApplicationDetailModal";
import axios from "axios";
import { toast } from 'react-toastify';

const getStatusClasses = (status) => {
  switch (status) {
    case "Approved": return "bg-green-100 text-green-700";
    case "Reverted for Correction": return "bg-yellow-100 text-yellow-700";
    case "Rejected": return "bg-red-100 text-red-700";
    case "Expired": return "bg-gray-200 text-gray-700"
    default: return "bg-violet-200 text-violet-700";
  }
};

const ManageApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [schemeList, setSchemeList] = useState([]);
  const [schemeFilter, setSchemeFilter] = useState('All');
  
    useEffect(() => {
      const fetchApplications = async () => {
       try {
        const token = localStorage.getItem('adminToken');
        if (!token) throw new Error('Authentication required.');

        const response = await axios.get('http://localhost:4000/api/admin/applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplications(response.data);

       } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error(error.response?.data?.message || "Failed to load application data.");
       } finally {
        setLoading(false);
       }
      };
      fetchApplications();
    }, []);

    useEffect(() => {
        const fetchSchemeList = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get('http://localhost:4000/api/admin/schemes/list', { 
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSchemeList(response.data); 
            } catch (error) {
                toast.error("Failed to fetch scheme list for filter.");
            }
        };
        fetchSchemeList();
    }, []);
    
  const filteredApplications = applications.filter(app => {
      const studentName = app.studentName || '';
      const sId = app.studentEmail || ''; 
      const matchesSearch = studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            sId.includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
      let matchesScheme = true;
      if (schemeFilter !== 'All') {
          const selectedSchemeObj = schemeList.find(s => s._id === schemeFilter);
          const selectedSchemeName = selectedSchemeObj ? selectedSchemeObj.name : null;
          matchesScheme = app.schemeName === selectedSchemeName;
      }
      return matchesSearch && matchesStatus && matchesScheme;
  });  


  const handleUpdateStatus = (updatedApp) => {
    setApplications(prevApps => 
      prevApps.map(app => {
        const currentId = app.id || app._id;
        const updatedId = updatedApp.id || updatedApp._id;
        if (String(currentId) === String(updatedId)) {
             return { ...app, ...updatedApp };
        }
        return app;
      })
    );
    setSelectedApplication(null); 
  };

  if (loading) return <div className="p-8 text-center">Loading applications data...</div>

  return (
    <div className="p-6 bg-indigo-100 min-h-screen ">
      {selectedApplication ? (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-right duration-300">
             <button 
                onClick={() => setSelectedApplication(null)}
                className="mb-4 flex items-center text-indigo-700 hover:text-indigo-900 font-bold transition"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Applications List
            </button>
            
            <ApplicationDetailModal 
                application={selectedApplication}
                onClose={() => setSelectedApplication(null)}
                onUpdateStatus={handleUpdateStatus}
            />
        </div>
      ) : (
        <div className="bg-indigo-100 rounded-xl shadow-lg p-6 border border-indigo-200 animate-in fade-in duration-500">
            <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 border-b pb-2">
                📋 Application Review Dashboard
            </h1>

            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
                <div className="relative flex-1 bg-indigo-50 rounded-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search by Student Name "
                    className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-lg focus:ring-violet-500/20 focus:border-indigo-500 focus:outline-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                </div>

                <select
                className="md:w-64 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-violet-500/20 focus:border-indigo-500 bg-indigo-50 focus:outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                >
                <option value="All">All Statuses</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved</option>
                <option value="Reverted for Correction">Reverted</option>
                <option value="Documents Missing">Documents Missing</option>
                <option value="Expired">Expired</option>
                </select>

                <select
                className="md:w-64 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-violet-500/20 focus:border-indigo-500 bg-indigo-50 focus:outline-none"
                value={schemeFilter}
                onChange={(e) => setSchemeFilter(e.target.value)}
                >
                <option value="All">All Schemes</option>
                {schemeList.map(scheme => (
                    <option key={scheme._id} value={scheme._id} >{scheme.name}</option>
                ))}
                </select>
            </div>

            <div className="overflow-x-auto bg-indigo-50 rounded-lg border border-indigo-300">
                <table className="min-w-full divide-y divide-indigo-200">
                <thead className="bg-indigo-200">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Student Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Scheme</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Eligibility</th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Note</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-indigo-50 divide-y divide-indigo-200">
                    {filteredApplications.length > 0 ? (
                    filteredApplications.map((app) => (
                        <tr key={app.id} className="hover:bg-indigo-100/50 transition" >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {app.studentName || 'N/A'} <br />
                            <span className="text-gray-500 text-xs">{app.studentEmail || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {app.schemeName || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(app.status)}`}>
                            {app.status}
                            </span>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {app.isEligible ? (
                                <span className="text-green-600 font-bold flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-1"/> Eligible
                                </span>
                            ) : (
                                <span className="text-red-600 font-bold flex items-center">
                                    <XCircle className="w-4 h-4 mr-1"/> Not Eligible
                                </span>
                            )}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                            {app.adminFeedback || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                            onClick={() => setSelectedApplication(app)}
                            disabled={app.status === "Expired"}
                            className={`px-3 py-1.5 rounded text-xs font-bold transition
                                ${app.status === "Expired"
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-violet-600 hover:bg-violet-700 text-white"}
                            `}                            
                            >
                            Review
                            </button>
                        </td>
                        </tr>
                    )) 
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                No applications found.
                            </td>
                        </tr>
                    )}
                </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplicationsPage;