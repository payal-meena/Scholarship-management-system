import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  XCircle,
  Calendar,
  Edit3,
  ArrowLeft,
  Ban,
} from "lucide-react";
import { toast } from "react-toastify";
import ReSubmitApplicationForm from "./ReSubmitApplicationForm";

const getStatusDetails = (status) => {
  switch (status) {
    case "Approved":
      return {
        icon: CheckCircle,
        classes: "bg-green-100 text-green-700 border border-green-200",
        text: "Approved",
      };
    case "Reverted for Correction":
      return {
        icon: AlertTriangle,
        classes: "bg-amber-100 text-amber-700 border border-amber-200",
        text: "Action Required",
      };
    case "Rejected":
      return {
        icon: XCircle,
        classes: "bg-red-100 text-red-700 border border-red-200",
        text: "Rejected",
      };
    default:
      return {
        icon: Clock,
        classes: "bg-indigo-100 text-indigo-700 border border-indigo-200",
        text: "Pending Review",
      };
  }
};

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [appToEdit, setAppToEdit] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("studentToken");
        if (!token) throw new Error("Authentication required.");

        const response = await axios.get(
          "http://localhost:4000/api/students/applications",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const formattedApps = response.data.map((app) => ({
          ...app,
          dateSubmitted: new Date(app.createdAt).toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
        }));
        setApplications(formattedApps);
      } catch (error) {
        console.error("Error fetching applications:", error);
        toast.error(
          error.response?.data?.message || "Failed to load application status."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const formatApplicationForDisplay = (app) => ({
    ...app,
    schemeName: app.scheme ? app.scheme.name : "N/A",
  });

  const handleResubmitSuccess = (updatedApplication) => {
    const formattedApp = formatApplicationForDisplay(updatedApplication);
    setApplications((prevApps) =>
      prevApps.map((app) => (app._id === formattedApp._id ? formattedApp : app))
    );
    toast.info("Application successfully updated and sent for review!");

    setAppToEdit(null);
  };

  const isDeadlinePassed = (deadlineString) => {
    if (!deadlineString) return false;
    const deadlineDate = new Date(deadlineString);
    const today = new Date();
    deadlineDate.setHours(23, 59, 59, 999);
    return today > deadlineDate;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-8 pb-12">
      {appToEdit ? (
        <div className="animate-in fade-in slide-in-from-right duration-300">
          <button
            onClick={() => setAppToEdit(null)}
            className="mb-4 flex items-center text-indigo-700 hover:text-indigo-900 font-bold transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to My Applications
          </button>

          <ReSubmitApplicationForm
            applicationId={appToEdit._id}
            initialData={appToEdit}
            onClose={() => setAppToEdit(null)}
            onResubmitSuccess={handleResubmitSuccess}
          />
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <div className="bg-indigo-100 p-6 rounded-2xl shadow-2xl border border-indigo-50 flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                My Applications
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Track the status of your scholarship applications.
              </p>
            </div>
            <div className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full font-bold text-sm">
              Total: {applications.length}
            </div>
          </div>

          {applications.length === 0 && (
            <div className="text-center py-16 bg-indigo-100 rounded-2xl shadow-2xl border border-dashed border-gray-300">
              <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                No applications yet
              </h3>
              <p className="text-gray-500 mt-1">
                You haven't applied for any scholarships yet.
              </p>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-1">
            {applications.map((app) => {
              const statusInfo = getStatusDetails(app.status);
              const deadlineExpired = isDeadlinePassed(app.scheme?.deadline);

              return (
                <div
                  key={app._id}
                  className="group bg-indigo-100 rounded-2xl shadow-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                          {app.scheme.name || "Unknown Scheme"}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1 gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Applied on {app.dateSubmitted}
                          </span>
                          {app.scheme?.deadline && (
                            <span
                              className={`text-xs px-2 py-0.5 rounded border ${
                                deadlineExpired
                                  ? "bg-red-50 text-red-600 border-red-200"
                                  : "bg-gray-50 text-gray-600 border-gray-200"
                              }`}
                            >
                              Deadline:{" "}
                              {new Date(
                                app.scheme.deadline
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      <div
                        className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${statusInfo.classes}`}
                      >
                        <statusInfo.icon className="w-4 h-4" />
                        <span>{statusInfo.text}</span>
                      </div>
                    </div>

                    <div
                      className={`rounded-xl p-5 ${
                        app.status === "Reverted for Correction"
                          ? "bg-indigo-50 border border-amber-100"
                          : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <h4
                        className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                          app.status === "Reverted for Correction"
                            ? "text-amber-800"
                            : "text-gray-500"
                        }`}
                      >
                        Admin Feedback
                      </h4>

                      <p
                        className={`text-sm ${
                          app.status === "Reverted for Correction"
                            ? "text-amber-900 font-medium"
                            : "text-gray-700 italic"
                        }`}
                      >
                        {app.adminFeedback ||
                          (app.status === "Pending Review"
                            ? "Your application is currently under review."
                            : "No remarks provided.")}
                      </p>

                      {app.status === "Reverted for Correction" && (
                        <div className="mt-4 flex items-center justify-between border-t border-amber-200 pt-4">
                          {deadlineExpired ? (
                            <div className="flex items-center justify-between text-red-600 gap-4" >
                              <span className="text-sm font-bold flex items-center">
                                <Ban className="w-4 h-4 mr-2" />
                                Correction Window Closed
                              </span>
                              <span className="text-xs bg-red-100 px-3 py-1 rounded-full font-semibold border border-red-200">
                                Deadline Expired
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-4">
                              <span className="text-xs font-bold text-amber-700 flex items-center">
                                <AlertTriangle className="w-4 h-4 mr-1" />{" "}
                                Action Required
                              </span>
                              <button
                                className="flex items-center gap-2 bg-amber-600 text-white px-5 py-2 rounded-lg hover:bg-amber-700 transition shadow-sm font-semibold text-sm hover:-translate-y-0.5"
                                onClick={() => setAppToEdit(app)}
                              >
                                <Edit3 className="w-4 h-4" />
                                Edit & Resubmit
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={`h-1 w-full ${
                      app.status === "Approved"
                        ? "bg-green-500"
                        : app.status === "Rejected"
                        ? "bg-red-500"
                        : app.status === "Reverted for Correction"
                        ? "bg-amber-500"
                        : "bg-indigo-500"
                    }`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplicationsPage;
