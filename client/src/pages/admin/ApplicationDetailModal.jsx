import React, { useState } from "react";
import { X, FileText, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    onUpdateStatus(application.id, status, comments);
    setIsLoading(false);
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-block bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <FileText className="w-6 h-6 text-indigo-950" />
            <span className="text-indigo-950">Application Details</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 p-2"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-8">
          <div className="md:cols-pan-2 space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 text-indigo-950">
              Student & Scheme Info
            </h3>

            <div className="bg-gray-50 p-4 rounded-lg space-y-1">
              <p>
                <strong>Student Name:</strong>
                {application.studentName || "N/A"}
              </p>
              <p>
                <strong>Student Email:</strong>
                {application.studentEmail || "N/A"}
              </p>
              {/* <p><strong>Student ID:</strong>{application.studentId || 'N/A'}</p> */}
              <p>
                <strong>Applied Scheme:</strong>
                {application.schemeName || "N/A"}
              </p>
              {/* <p><strong>Date Submitted</strong>{application.date || 'N/A'}</p> */}
              <p>
                <strong>Current Status:</strong>
                <span
                  className={`px-3 py-1 ml-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    application.status
                  )} text-white`}
                >
                  {application.status}
                </span>
              </p>
            </div>

            <h3 className="text-lg font-semibold border-b pb-2 mt-4 text-indigo-950">
              Uploaded Documents
            </h3>
            <div className="space-y-3">
              {application.documentPaths &&
              Object.keys(application.documentPaths).length > 0 ? (
                Object.entries(application.documentPaths).map(([key, path]) =>
                  path ? (
                    <div
                      key={key}
                      className="flex justify-between items-center p-3 border rounded-lg hover:bg-violet-50 transition"
                    >
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/File$/, "").replace(/([A-Z])/g, " $1")}
                      </span>
                      <a
                        href={
                          path.startsWith("http")
                            ? path
                            : `${import.meta.env.VITE_API_URL}/${path.replace(
                                /^\/+/,
                                ""
                              )}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-violet-600 font-semibold hover:underline"
                      >
                        View
                      </a>
                    </div>
                  ) : null
                )
              ) : (
                <p className="text-gray-500 text-sm">
                  No documents uploaded for this application.
                </p>
              )}
            </div>
          </div>

          <div className="md:col-span-1 bg-gray-100 p-4 rounded-xl shadow-inner space-y-4">
            <h3 className="text-lg font-bold text-red-700 ">
              Action & Verification
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Update Application Status:
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`w-full p-2 border rounded-lg font-semibold ${getStatusColor(
                  status
                ).replace("bg", "border")}`}
              >
                <option value="Pending Review">Pending Review</option>
                <option value="Approved">Approved(Send to University)</option>
                <option value="Reverted for Correction">
                  Reverted for Correction (Notify Student)
                </option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admin Feedback/Reason:
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows="4"
                placeholder="Enter specific reasons for Reversion (e.g., Income proof date is expired) or confirmation notes."
                className="w-full p-2 border rounded-lg focus:ring-violet-500/20"
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg text-white font-semibold transition ${getStatusColor(
                status
              )} hover:opacity-90 disabled:opacity-50`}
            >
              {isLoading ? "Updating..." : "Confirm Status Update"}
            </button>

            <p className="text-sm text-red-500 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1" /> Changing status
              triggers student notification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailModal;
