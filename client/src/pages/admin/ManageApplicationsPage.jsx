import React, { useState } from "react";
import { Search, Users } from "lucide-react";
import ApplicationDetailModal from "./ApplicationDetailModal";

const initialApplications = [
  {
    id: 101,
    name: "Rahul Sharma",
    studentId: "S2024001",
    scheme: "Post metric Scholarship",
    status: "Pending Review",
    documents: "Incomplete",
    date: "2025-09-28",
  },
  {
    id: 102,
    name: "Priya Singh",
    studentId: "S2024002",
    scheme: "Central Sector Scholarship",
    status: "Approved",
    documents: "Verified",
    date: "2025-09-29",
  },
  {
    id: 103,
    name: "Mohan Das",
    studentId: "S2024003",
    scheme: "Post metric Scholarship",
    status: "Reverted for Correction",
    documents: "Incorrect Income Proof",
    date: "2025-09-30",
  },
  {
    id: 104,
    name: "Anjali Verma",
    studentId: "S2024004",
    scheme: "Gav Ki Beti Scholarship",
    status: "Documents Missing",
    documents: "N/A",
    date: "2025-10-01",
  },
];

const getStatusClasses = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Reverted for Correction":
      return "bg-yellow-100 text-yellow-700";
    case "Documents Missing":
      return "bg-red-100 text-red-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

const ManageApplicationsPage = () => {
  const [applications, setApplications] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedApplication, setSelectedApplication] = useState(null);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.studentId.includes(searchTerm);
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (appId, newStatus, feedback) => {
      setApplications(prevApps => 
        prevApps.map(app => 
          app.id === appId 
          ? {
            ...app, 
            status: newStatus,
             documents: feedback || app.documents,  }
             : app
        )
      );
      console.log(`Succesfully updated ID ${appId} to ${newStatus}. Feedback: ${feedback}`);
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
        Application Review Dashboard
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
          <option value="Pending Review">Pending Review</option>
          <option value="Approved">Approved</option>
          <option value="Reverted for Correction">
            Reverted for Correction
          </option>
          <option value="Documents Missing">Documents Missing</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-gray-50 rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
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
                Document Note
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.length > 0 &&  
              filteredApplications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.name} <br />
                    <span className="text-gray-500 text-xs">
                      {app.studentId}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.scheme}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.documents}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="text-indigo-600 hover:text-indigo-900 text-xs font-bold"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
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
