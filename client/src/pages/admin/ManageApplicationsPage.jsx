import React, { useState, useEffect } from "react";
import { Search, Users, CheckCircle, XCircle } from "lucide-react";
import ApplicationDetailModal from "./ApplicationDetailModal";
import axios from "axios";
import { toast } from 'react-toastify';

// const initialApplications = [
//   {
//     id: 101,
//     name: "Rahul Sharma",
//     studentId: "S2024001",
//     scheme: "Post metric Scholarship",
//     status: "Pending Review",
//     documents: "Incomplete",
//     date: "2025-09-28",
//   },
//   {
//     id: 102,
//     name: "Priya Singh",
//     studentId: "S2024002",
//     scheme: "Central Sector Scholarship",
//     status: "Approved",
//     documents: "Verified",
//     date: "2025-09-29",
//   },
//   {
//     id: 103,
//     name: "Mohan Das",
//     studentId: "S2024003",
//     scheme: "Post metric Scholarship",
//     status: "Reverted for Correction",
//     documents: "Incorrect Income Proof",
//     date: "2025-09-30",
//   },
//   {
//     id: 104,
//     name: "Anjali Verma",
//     studentId: "S2024004",
//     scheme: "Gav Ki Beti Scholarship",
//     status: "Documents Missing",
//     documents: "N/A",
//     date: "2025-10-01",
//   },
// ];

const getStatusClasses = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Reverted for Correction":
      return "bg-yellow-100 text-yellow-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-violet-200 text-violet-700";
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    const matchesSearch = studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (app.studentId || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const appSchemeId = app.scheme?._id ? app.scheme._id.toString() : null; 
    const filterValue = schemeFilter; 
    const matchesScheme = filterValue === 'All' || appSchemeId === filterValue; 
        return matchesSearch && matchesStatus && matchesScheme;
});    


  const handleUpdateStatus = (updatedApp) => {
      setApplications(prevApps => 
        prevApps.map(app => 
          app._id === updatedApp._id ? updatedApp : app
        )
      );
      setSelectedApplication(null);
      toast.success(`Application ID ${updatedApp._id} status updated to ${updatedApp.status}.`);
  };
  if (loading) {
    return <div className="p-8 text-center">Loading applications data...</div>
  }

  return (
    <div className="p-6 bg-indigo-100 rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 border-b pb-2">
       📋 Application Review Dashboard
      </h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1 bg-indigo-50">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Student Name or ID..."
            className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-lg focus:ring-violet-500/20 focus:border-indigo-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="md:w-64 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-violet-500/20 focus:border-indigo-500 bg-indigo-50 focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending Review">Pending Review</option>
          <option value="Approved">Approved</option>
          <option value="Reverted for Correction">
            Reverted for Correction
          </option>
          <option value="Documents Missing">Documents Missing</option>
        </select>

        <select
          className="md:w-64 px-4 py-2 border border-indigo-300 rounded-lg focus:ring-violet-500/20 focus:border-indigo-500 bg-indigo-50 focus:outline-none"
          value={schemeFilter}
          onChange={(e) => setSchemeFilter(e.target.value)}
        >
          <option value="All">Filter by Scheme (All)</option>
          {schemeList.map(scheme => (
            <option key={scheme._id} value={scheme._id} >
              {scheme.name}
            </option>
          ))}
          
        </select>
      </div>

      <div className="overflow-x-auto bg-indigo-50 rounded-lg border border-indigo-300">
        <table className="min-w-full divide-y divide-indigo-200">
          <thead className="bg-indigo-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Scheme
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Eligibility
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Document Note
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-indigo-50 divide-y divide-indigo-200">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <tr key={app.id}  >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.studentName || 'N/A'} <br />
                    <span className="text-gray-500 text-xs">
                      {app.studentEmail || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.schemeName || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.isEligible ? (
                          <span className="text-green-600 font-bold flex items-center">
                              <CheckCircle className="w-4 h-4 mr-1"/> Eligible
                          </span>
                      ) : (
                          <span className="text-red-600 font-bold flex items-center">
                              <XCircle className="w-4 h-4 mr-1"/> Not Eligible
                          </span>
                      )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.documentsNote || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="text-violet-600 hover:text-violet-900 text-xs font-bold"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              )) 
            )  : (
                  <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No application found.
                      </td>
                  </tr>
                 )
              }
          </tbody>
        </table>
      </div>
              {selectedApplication && (
                <ApplicationDetailModal 
                    application={selectedApplication}
                    onClose={() => setSelectedApplication(null)}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}
    </div>
  );
};

export default ManageApplicationsPage;
