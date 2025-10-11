import React, { useState } from 'react'
import { Clock, CheckCircle, AlertTriangle, FileText, XCircle } from 'lucide-react';

const userApplications = [
  {
        id: 1,
        schemeName: "Central Sector Scheme 2025-26",
        dateSubmitted: "2025-10-09",
        status: "Pending Review",
        adminFeedback: "Your application is waiting for document verification.",
        documentsComplete: true,
    },
    {
        id: 2,
        schemeName: "Post Metric Scholarship",
        dateSubmitted: "2025-09-25",
        status: "Reverted for Correction",
        adminFeedback: "Income proof document is blurry. Please upload a clear PDF copy.",
        documentsComplete: false,
    },
    {
        id: 3,
        schemeName: "Gav ki Beti Scholarship",
        dateSubmitted: "2025-08-10",
        status: "Approved",
        adminFeedback: "Verification complete. Application forwarded to University.",
        documentsComplete: true,
    },
];

const getStatusDetails = (status) => {
    switch (status) {
      case 'Approved':
        return { icon: CheckCircle, classes: 'bg-green-100 text-green-700', text: 'Approved'};
      case 'Reverted for Correction':
        return { icon: AlertTriangle, classes: 'bg-yellow-100 text-yellow-800 border-yellow-600 border-2', text: 'Needs Action'};
      case 'Rejected':
        return { icon: XCircle, classes: 'bg-red-100 text-red-700', text: 'Rejected'};
      default:
        return { icon: Clock, classes: 'bg-blue-100 text-blue-700', text: 'Pending Review'};
    }
}

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState(userApplications);
  return (
    <div className='bg-white p-6 rounded-lg shadow-md mx-auto space-y-8'>
        <h2 className='text-3xl font-extrabold text-gray-800 border-b pb-3 flex items-center'>
          <FileText className='w-8 h-8 mr-3 text-indigo-600' />
          My Applications
          </h2>

          {applications.length === 0 && (
            <div className='text-center p-10 bg-white rounded-lg shadow-md'>
              <p className='text-lg text-gray-500'>You have not submitted any application yet.</p>
            </div>
          )}

          {applications.map((app) => {
            const statusInfo = getStatusDetails(app.status);

            return (
              <div key={app.id} className='bg-white p-6 rounded-xl shadow-lg border-l-4' style={{ borderColor: statusInfo.classes.includes('yellow') ? '#D97706' : statusInfo.classes.includes('green') ? '#10B981' : '#6366F1' }}>
                  <div className='flex justify-between items-start mb-4'>
                      <h3 className='text-xl font-bold text-gray-900'>{app.schemeName}</h3>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.classes}`}>
                            <statusInfo.icon className='w-4 h-4' />
                            <span>{statusInfo.text}</span>
                      </div>
                  </div>
                  <p className='text-sm text-gray-500 mb-4'>Submitted on: {app.dateSubmitted}</p>

                  <div className='p-3 border-t pt-4'>
                      <p className='font-semibold text-gray-700 mb-2'>Current Feedback / Status Note:</p>

                      {app.status === 'Reverted for Correction' ? (
                        <div className='bg-yellow-50 p-3 rounded-lg border border-yellow-300'>
                            <p className='text-sm text-yellow-800 font-medium'>{app.adminFeedback}</p>
                            <p className='text-xs text-yellow-600mt-2'>
                              **ACTION REQUIRED:** Please re-upload the corrected document(s) by editing your application.
                            </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 italic">{app.adminFeedback}</p>
                      )}
                  </div>
                   {app.status === 'Reverted for Correction' && (
                            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                                Edit & Re-submit Application
                            </button>
                        )}
              </div>
            );
          })}
    </div>
  );
};

export default MyApplicationsPage