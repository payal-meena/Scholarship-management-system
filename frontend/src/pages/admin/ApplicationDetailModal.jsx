import React, { useState } from "react";
import { X, FileText, AlertTriangle, Download, ExternalLink } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const ApplicationDetailModal = ({ application, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState(application.status);
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (currentStatus) => {
    if (currentStatus.includes("Approved")) return "bg-green-600";
    if (currentStatus.includes("Reverted")) return "bg-yellow-600";
    if (currentStatus.includes("Rejected")) return "bg-red-600";
    return "bg-violet-900";
  };

  const handleSubmit = async () => {
    if (status === application.status && !comments) {
      alert("Please change the status or add a comment before updating.");
      return;
    }
    setIsLoading(true);

    try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.put(`http://localhost:4000/api/admin/applications/${application.id}/status`, {
            status: status,
            comments: comments,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        onUpdateStatus(response.data.application); 
        toast.success(response.data.message);
        setTimeout(() => { onClose(); }, 100);
    } catch (error) {
        console.error("error while updating ..",error);
        toast.error("Update failed.");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-indigo-100 rounded-xl shadow-2xl border border-indigo-100 overflow-hidden ">
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2 ">
            <FileText className="w-6 h-6 text-indigo-900" />
            <span className="text-indigo-900">Review Application Details</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-2 transition"
            title="Close View"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
            <div className="border border-indigo-100 rounded-xl p-5 bg-indigo-50 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                   🎓 Student & Scheme Info
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Student Name</p>
                        <p className="text-gray-800 font-medium">{application.studentName || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Student Email</p>
                        <p className="text-gray-800 font-medium">{application.studentEmail || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Applied Scheme</p>
                        <p className="text-indigo-700 font-bold">{application.schemeName || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Current Status</p>
                        <span className={`mt-1 inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(application.status)} text-white`}>
                            {application.status}
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-4 text-indigo-900">
                📄 Uploaded Documents
                </h3>
                <div className="grid gap-3">
                {application.documentPaths && Object.keys(application.documentPaths).length > 0 ? (
                    Object.entries(application.documentPaths).map(([key, path]) =>
                    path ? (
                        <div key={key} className="flex justify-between items-center p-4 border border-gray-300 rounded-lg bg-indigo-50 hover:bg-gray-50 transition group">
                            <div className="flex items-center space-x-3">
                                <FileText className="text-indigo-400 group-hover:text-indigo-600" size={20}/>
                                <span className="text-sm font-medium capitalize text-gray-700">
                                    {key.replace(/File$/, "").replace(/([A-Z])/g, " $1")}
                                </span>
                            </div>
                            <a
                                href={path.startsWith("http") ? path : `${import.meta.env.VITE_API_URL}/${path.replace(/^\/+/, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-violet-600 font-semibold text-sm hover:text-violet-800 bg-white px-3 py-1.5 rounded border border-violet-200 hover:border-violet-400 transition"
                            >
                                <span>View</span> <ExternalLink size={14} />
                            </a>
                        </div>
                    ) : null
                    )
                ) : (
                    <p className="text-gray-500 text-sm italic p-4 bg-gray-50 rounded-lg text-center">
                        No documents uploaded for this application.
                    </p>
                )}
                </div>
            </div>
          </div>

          <div className="md:col-span-1">
              <div className="bg-indigo-50 p-5 rounded-xl shadow-md border border-gray-200 sticky top-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                    ⚡ Verification Action
                </h3>
                
                <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Update Status:
                    </label>
                    <div className="relative">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={`w-full p-2.5 border-2 rounded-lg font-bold text-sm focus:outline-none appearance-none ${
                                status === 'Approved' ? 'border-green-500 text-green-700 bg-green-50' :
                                status === 'Rejected' ? 'border-red-500 text-red-700 bg-red-50' :
                                status === 'Reverted for Correction' ? 'border-yellow-500 text-yellow-700 bg-yellow-50' :
                                'border-gray-300 text-gray-700'
                            }`}
                        >
                            <option value="Pending Review">Pending Review</option>
                            <option value="Approved">Approved (Send to University)</option>
                            <option value="Reverted for Correction">Revert for Correction</option>
                            <option value="Rejected">Reject Application</option>
                        </select>
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                        Admin Remarks:
                    </label>
                    <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        rows="5"
                        placeholder="Required for Rejection or Reversion. Add specific notes for the student."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-00 focus:border-transparent text-sm focus:outline-none"
                    ></textarea>
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className={`w-full py-3 rounded-lg text-white font-bold text-sm shadow-md transition transform active:scale-95 ${
                            getStatusColor(status)
                        } hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                    {isLoading ? "Processing..." : "Confirm Status Update"}
                    </button>

                    <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded-lg border border-blue-100 flex items-start">
                        <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" /> 
                        <span>Student will receive an immediate notification upon status change.</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ApplicationDetailModal;