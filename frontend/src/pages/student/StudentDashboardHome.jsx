import React, { useEffect, useState } from 'react';
import { FileText, Award, AlertCircle, CheckCircle, Clock, ArrowRight, XCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className='bg-white p-5 rounded-2xl shadow-sm border border-indigo-50 hover:shadow-md transition-all duration-300 relative overflow-hidden group'>
        <div className='flex justify-between items-start z-10 relative'>
            <div>
                <p className='text-xs font-bold text-gray-400 uppercase tracking-wider'>{title}</p>
                <h3 className='text-2xl font-extrabold text-gray-800 mt-1'>{value}</h3>
                {subtext && <p className='text-xs text-gray-500 mt-1'>{subtext}</p>}
            </div>
            <div className={`p-3 rounded-xl transform group-hover:rotate-12 transition-transform duration-300`} style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-6 h-6" style={{ color: color }} />
            </div>
        </div>
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-5 group-hover:scale-110 transition-transform" style={{ backgroundColor: color }}></div>
    </div>
);

const ApplicationTracker = ({ status }) => {
    const steps = [
        { label: 'Submitted', active: true },
        { label: 'Under Review', active: status !== 'Pending Review' }, 
        { label: 'Decision', active: status === 'Approved' || status === 'Rejected' }
    ];

    const isRejected = status === 'Rejected';
    const isReverted = status === 'Reverted for Correction';

    return (
        <div className="relative flex items-center justify-between w-full mt-6 mb-2">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 -z-10"></div>
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 transition-all duration-1000 -z-10`} 
                 style={{ width: status === 'Approved' ? '100%' : status === 'Pending Review' ? '33%' : '66%' }}></div>

            {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center bg-white px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500
                        ${step.active 
                            ? (isRejected && index === 2 ? 'border-red-500 bg-red-50 text-red-600' : 
                               isReverted && index === 1 ? 'border-yellow-500 bg-yellow-50 text-yellow-600' :
                               'border-indigo-600 bg-indigo-600 text-white')
                            : 'border-gray-300 bg-white text-gray-300'
                        }`}
                    >
                        {step.active ? (
                            isRejected && index === 2 ? <XCircle size={16}/> :
                            isReverted && index === 1 ? <AlertCircle size={16}/> :
                            <CheckCircle size={16}/>
                        ) : (
                            <span className="text-xs font-bold">{index + 1}</span>
                        )}
                    </div>
                    <span className={`text-xs font-medium mt-2 ${step.active ? 'text-indigo-900' : 'text-gray-400'}`}>
                        {step.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

const StudentDashboardHome = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [studentName, setStudentName] = useState("Student");
    const [stats, setStats] = useState({ applied: 0, approved: 0, pending: 0 });
    const [latestApp, setLatestApp] = useState(null);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const token = localStorage.getItem('studentToken');
                const headers = { Authorization: `Bearer ${token}` };

                const [profileRes, appsRes] = await Promise.all([
                    axios.get('http://localhost:4000/api/students/me', { headers }),
                    axios.get('http://localhost:4000/api/students/applications', { headers }) 
                ]);

                setStudentName(profileRes.data.name.split(' ')[0]); 

                const apps = appsRes.data || [];
                
                setStats({
                    applied: apps.length,
                    approved: apps.filter(a => a.status === 'Approved').length,
                    pending: apps.filter(a => a.status === 'Pending Review').length
                });

                if (apps.length > 0) {
                    setLatestApp(apps[0]); 
                }

            } catch (error) {
                console.error("Student Dashboard Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10 mx-auto">
            
            <div className="bg-gradient-to-r from-indigo-900 to-violet-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-extrabold mb-2">Hello, {studentName}! 👋</h1>
                    <p className="text-indigo-100 opacity-90 max-w-lg">
                        Welcome to your scholarship portal. Track your applications and manage your profile here.
                    </p>
                    <button 
                        onClick={() => navigate('/student/schemes')}
                        className="mt-6 bg-indigo-50 text-indigo-700 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-indigo-50 transition shadow-lg inline-flex items-center"
                    >
                        Browse Schemes <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
                <Award className="absolute right-10 top-1/2 -translate-y-1/2 w-40 h-40 text-white opacity-10 rotate-12" />
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-50 opacity-10 rounded-full blur-3xl"></div>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
                <StatCard 
                    title="Applied" 
                    value={stats.applied} 
                    icon={FileText} 
                    color="#3b82f6" 
                    subtext="Total Applications"
                />
                <StatCard 
                    title="Approved" 
                    value={stats.approved} 
                    icon={Award} 
                    color="#10b981" 
                    subtext="Scholarships Won"
                />
                <StatCard 
                    title="Pending" 
                    value={stats.pending} 
                    icon={Clock} 
                    color="#f59e0b" 
                    subtext="Under Review"
                />
            </div>

            <div className="bg-white rounded-2xl shadow-md border border-indigo-50 p-8">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center">
                        <Clock className="w-6 h-6 mr-2 text-indigo-500" /> Recent Application Status
                    </h2>
                    {latestApp && (
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold 
                            ${latestApp.status === 'Approved' ? 'bg-green-100 text-green-700' :
                              latestApp.status === 'Reverted for Correction' ? 'bg-red-100 text-red-700' : 
                              'bg-indigo-100 text-indigo-700'}`}>
                            {latestApp.status}
                        </span>
                    )}
                </div>

                {latestApp ? (
                    <>
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {latestApp.scheme ? latestApp.scheme.name : 'Unknown Scheme'}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Application ID: <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-700">#{latestApp._id?.substring(latestApp._id.length - 6).toUpperCase()}</span></p>
                        </div>
                        
                        <ApplicationTracker status={latestApp.status} />

                        {latestApp.status === 'Reverted for Correction' && (
                            <div className="mt-8 bg-red-50 border border-red-100 p-5 rounded-xl flex items-start gap-4">
                                <AlertCircle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-red-800 text-base">Action Required</h4>
                                    <p className="text-sm text-red-700 mt-1">
                                        Admin Note: "{latestApp.documentsNote || 'Please check your documents.'}"
                                    </p>
                                </div>
                                <button 
                                    onClick={() => navigate('/student/applications')}
                                    className="bg-red-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-red-700 transition shadow-sm"
                                >
                                    Fix Documents
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                        <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium text-lg">You haven't applied for any scholarships yet.</p>
                        <button onClick={() => navigate('/student/schemes')} className="text-indigo-600 font-bold mt-2 hover:underline">
                            Browse Available Schemes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboardHome;