import React, { useEffect, useState } from 'react';
import { FileText, Award, AlertCircle, CheckCircle, Clock, ArrowRight, Upload, XCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
    <div className='bg-indigo-50 p-5 rounded-2xl shadow-sm border border-indigo-50 hover:shadow-md transition-all duration-300 relative overflow-hidden group'>
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
                <div key={index} className="flex flex-col items-center bg-indigo-50 px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500
                        ${step.active 
                            ? (isRejected && index === 2 ? 'border-red-500 bg-red-50 text-red-600' : 
                               isReverted && index === 1 ? 'border-yellow-500 bg-yellow-50 text-yellow-600' :
                               'border-indigo-600 bg-indigo-600 text-white')
                            : 'border-gray-300 bg-indigo-50 text-gray-300'
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
    const [profileCompleteness, setProfileCompleteness] = useState(0);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const token = localStorage.getItem('studentToken');
                const headers = { Authorization: `Bearer ${token}` };

                const [profileRes, appsRes] = await Promise.all([
                    axios.get('http://localhost:4000/api/students/me', { headers }),
                    axios.get('http://localhost:4000/api/students/my-applications', { headers }) 
                ]);

                setStudentName(profileRes.data.name.split(' ')[0]); 

                const p = profileRes.data;
                let score = 0;
                if(p.name && p.email && p.contact) score += 40; 
                if(p.currentStudyYear && p.studentId) score += 30; 
                score += 30; 
                setProfileCompleteness(score);

                const apps = appsRes.data || [];
                setStats({
                    applied: apps.length,
                    approved: apps.filter(a => a.status === 'Approved').length,
                    pending: apps.filter(a => a.status === 'Pending Review').length
                });

                if (apps.length > 0) {
                    setLatestApp(apps[apps.length - 1]);
                }

            } catch (error) {
                console.error("Student Dashboard Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudentData();
    }, []);

    const pieData = [
        { name: 'Completed', value: profileCompleteness, color: '#4f46e5' }, 
        { name: 'Remaining', value: 100 - profileCompleteness, color: '#e0e7ff' }, 
    ];

    if (loading) return <div className="p-8 text-center text-indigo-600">Loading your dashboard...</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
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

            <div className="grid lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-8">
                    
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

                    <div className="bg-indigo-50 rounded-2xl shadow-md border border-indigo-50 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-gray-800 flex items-center">
                                <Clock className="w-5 h-5 mr-2 text-indigo-500" /> Recent Application Status
                            </h2>
                            {latestApp && (
                                <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                    ${latestApp.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                      latestApp.status === 'Reverted for Correction' ? 'bg-red-100 text-red-700' : 
                                      'bg-indigo-100 text-indigo-700'}`}>
                                    {latestApp.status}
                                </span>
                            )}
                        </div>

                        {latestApp ? (
                            <>
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{latestApp.schemeName}</h3>
                                    <p className="text-sm text-gray-500">Application ID: #{latestApp._id?.substring(latestApp._id.length - 6).toUpperCase()}</p>
                                </div>
                                
                                <ApplicationTracker status={latestApp.status} />

                                {latestApp.status === 'Reverted for Correction' && (
                                    <div className="mt-6 bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-red-800 text-sm">Action Required</h4>
                                            <p className="text-xs text-red-600 mt-1">
                                                Admin Note: "{latestApp.documentsNote || 'Please check your documents.'}"
                                            </p>
                                            <button 
                                                onClick={() => navigate('/student/applications')}
                                                className="mt-2 text-xs font-bold bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 transition"
                                            >
                                                Fix Documents
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-10 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                                <FileText className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-gray-500 font-medium">You haven't applied for any scholarships yet.</p>
                                <button onClick={() => navigate('/student/schemes')} className="text-indigo-600 font-bold text-sm mt-2 hover:underline">
                                    Browse Schemes
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    
                    <div className="bg-indigo-50 rounded-2xl shadow-md border border-indigo-50 p-6 flex flex-col items-center relative overflow-hidden">
                        <h2 className="text-lg font-bold text-gray-800 w-full mb-2">Profile Strength</h2>
                        
                        <div className="h-40 w-full relative flex justify-center items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={60}
                                        startAngle={90}
                                        endAngle={-270}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={10}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-black text-indigo-700">{profileCompleteness}%</span>
                            </div>
                        </div>

                        <p className="text-sm text-center text-gray-500 mt-2">
                            {profileCompleteness === 100 
                                ? "Excellent! Your profile is fully updated." 
                                : "Complete your profile to unlock all schemes."}
                        </p>
                        
                        {profileCompleteness < 100 && (
                            <button 
                                onClick={() => navigate('/student/profile')}
                                className="mt-4 w-full py-2 rounded-lg border border-indigo-100 text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition"
                            >
                                Update Profile
                            </button>
                        )}
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900 to-violet-900 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2 flex items-center">
                                <Upload className="w-5 h-5 mr-2" /> Missing Docs?
                            </h3>
                            <p className="text-indigo-200 text-xs mb-4">
                                Ensure your Income Certificate and Marksheets are up to date for fast approval.
                            </p>
                            <button 
                                onClick={() => navigate('/student/profile')}
                                className="bg-indigo-50/20 hover:bg-indigo-50/30 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg text-xs font-bold transition w-full"
                            >
                                Manage Documents
                            </button>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full blur-2xl opacity-50"></div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default StudentDashboardHome;