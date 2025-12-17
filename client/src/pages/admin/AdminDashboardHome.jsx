import React, { useEffect, useState } from 'react';
import { Users, ListChecks, DollarSign, Clock, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const StatCard = ({ title, value, icon: Icon, color, loading, onClick }) => (
    <div 
        onClick={onClick} 
        className={`bg-indigo-50 p-6 rounded-xl shadow-md border-l-4 cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden group`} 
        style={{ borderColor: color }}
    >
        <div className='flex items-center justify-between z-10 relative'>
            <div>
                <p className='text-sm font-semibold text-gray-500 uppercase tracking-wider'>{title}</p>
                {loading ? (
                    <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
                ) : (
                    <p className='text-3xl font-extrabold text-gray-800 mt-2'>{value}</p>
                )}
            </div>
            <div className={`p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform`} style={{ backgroundColor: `${color}15` }}> 
                <Icon className={`w-8 h-8`} style={{ color: color }} />
            </div>
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: color }}></div>
    </div>
);

const AdminDashboardHome = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalStudents: 0,
        reviewedApps: 0,
        pendingApps: 0,
        fundsDisbursed: 0
    });
    
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [recentApps, setRecentApps] = useState([]);

    const [alerts, setAlerts] = useState({ revertedCount: 0, expiringSchemes: [] });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const headers = { Authorization: `Bearer ${token}` };

                const [studentsRes, appsRes, schemesRes] = await Promise.all([
                    axios.get('http://localhost:4000/api/admin/students', { headers }),
                    axios.get('http://localhost:4000/api/admin/applications', { headers }),
                    axios.get('http://localhost:4000/api/admin/schemes', { headers })
                ]);

                const applications = appsRes.data;
                const schemes = schemesRes.data;

                const pending = applications.filter(app => app.status === 'Pending Review').length;
                const reviewed = applications.filter(app => ['Approved', 'Rejected'].includes(app.status)).length;
                const reverted = applications.filter(app => app.status === 'Reverted for Correction').length;

                let totalFunds = 0;
                applications.forEach(app => {
                    if (app.status === 'Approved') {
                        const scheme = schemes.find(s => s.name === app.schemeName);
                        if (scheme && scheme.fundAmount) totalFunds += Number(scheme.fundAmount);
                    }
                });
                
                const formatCurrency = (amount) => {
                    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
                    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
                    return `₹${amount.toLocaleString('en-IN')}`;
                };

                setStats({
                    totalStudents: studentsRes.data.length,
                    reviewedApps: reviewed,
                    pendingApps: pending,
                    fundsDisbursed: formatCurrency(totalFunds)
                });

                const approvedCount = applications.filter(a => a.status === 'Approved').length;
                const rejectedCount = applications.filter(a => a.status === 'Rejected').length;
                
                setPieData([
                    { name: 'Pending', value: pending, color: '#6366f1' }, 
                    { name: 'Approved', value: approvedCount, color: '#10b981' }, 
                    { name: 'Reverted', value: reverted, color: '#f59e0b' }, 
                    { name: 'Rejected', value: rejectedCount, color: '#ef4444' }, 
                ]);

                const schemeCounts = {};
                applications.forEach(app => {
                    schemeCounts[app.schemeName] = (schemeCounts[app.schemeName] || 0) + 1;
                });
                
                const barChartData = Object.keys(schemeCounts).map(key => ({
                    name: key.length > 15 ? key.substring(0, 15) + '...' : key, 
                    applications: schemeCounts[key]
                })).sort((a, b) => b.applications - a.applications).slice(0, 5); 

                setBarData(barChartData);

                setRecentApps(applications.slice(0, 5));

                const today = new Date();
                const warningDate = new Date();
                warningDate.setDate(today.getDate() + 15);
                const expiring = schemes.filter(s => {
                    const deadline = new Date(s.deadline);
                    return deadline > today && deadline <= warningDate && s.isActive;
                });

                setAlerts({ revertedCount: reverted, expiringSchemes: expiring });

            } catch (error) {
                console.error("Dashboard Error:", error);
                toast.error("Failed to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const goToApps = (filterType) => {
        navigate('/admin/applications');
    };

    return (
        <div className='space-y-8 animate-in fade-in duration-500 pb-10'>
            <div className='flex justify-between items-end'>
                <div>
                    <h1 className='text-3xl font-extrabold text-indigo-900'>Dashboard Overview</h1>
                    <p className='text-gray-500 mt-1'>Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className='text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full'>
                    Last Updated: {new Date().toLocaleTimeString()}
                </div>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <StatCard 
                    title='Total Students' 
                    value={stats.totalStudents} 
                    icon={Users} 
                    color='#3B1C82' 
                    loading={loading}
                    onClick={() => navigate('/admin/students')} 
                />
                <StatCard 
                    title='Pending Reviews' 
                    value={stats.pendingApps} 
                    icon={Clock} 
                    color='#F59E0B' 
                    loading={loading}
                    onClick={() => goToApps('Pending')}
                />
                <StatCard 
                    title='Funds Disbursed' 
                    value={stats.fundsDisbursed} 
                    icon={DollarSign} 
                    color='#10B981' 
                    loading={loading}
                />
                <StatCard 
                    title='Total Processed' 
                    value={stats.reviewedApps} 
                    icon={ListChecks} 
                    color='#6366f1'
                    loading={loading}
                    onClick={() => goToApps('All')}
                />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                
                <div className="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-50">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Application Status</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-50">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Top Schemes by Applications</h2>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={100} style={{ fontSize: '12px' }} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="applications" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className='grid lg:grid-cols-3 gap-6'>
                
                <div className='lg:col-span-1 space-y-6'>
                    <div className='bg-indigo-50 p-6 rounded-xl shadow-md border border-red-100'>
                        <h2 className='text-lg font-bold text-gray-800 mb-4 flex items-center'>
                             ⚡ Attention Needed
                        </h2>
                        {loading ? <p>Loading...</p> : (
                            <ul className='space-y-3'>
                                {alerts.revertedCount > 0 && (
                                    <li className="flex items-start text-sm text-red-700 bg-red-50 p-3 rounded-lg border border-red-100">
                                        <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                        <span><strong>{alerts.revertedCount}</strong> applications reverted. Monitor for re-submission.</span>
                                    </li>
                                )}
                                {alerts.expiringSchemes.map(scheme => (
                                    <li key={scheme._id} className='flex items-start text-sm text-yellow-800 bg-yellow-50 p-3 rounded-lg border border-yellow-100'>
                                        <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                        <span><strong>{scheme.name}</strong> closes on {new Date(scheme.deadline).toLocaleDateString()}.</span>
                                    </li>
                                ))}
                                {alerts.revertedCount === 0 && alerts.expiringSchemes.length === 0 && (
                                    <p className="text-green-600 text-sm italic">No urgent alerts at the moment.</p>
                                )}
                            </ul>
                        )}
                    </div>
                </div>

                <div className='lg:col-span-2 bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-50'>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className='text-lg font-bold text-gray-800'>Recent Applications</h2>
                        <button onClick={() => navigate('/admin-dashboard/manage-applications')} className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center">
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-indigo-50/50 border-b">
                                <tr>
                                    <th className="px-4 py-3">Student</th>
                                    <th className="px-4 py-3">Scheme</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentApps.map(app => (
                                    <tr key={app._id || app.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-gray-900">{app.studentName}</td>
                                        <td className="px-4 py-3 text-gray-500 truncate max-w-[150px]">{app.schemeName}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold 
                                                ${app.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                                                  app.status === 'Pending Review' ? 'bg-indigo-100 text-indigo-700' : 
                                                  app.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => navigate('/admin-dashboard/manage-applications')} className="text-gray-400 hover:text-indigo-600">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {recentApps.length === 0 && !loading && (
                                    <tr><td colSpan="4" className="text-center py-4 text-gray-500">No recent activity.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardHome;