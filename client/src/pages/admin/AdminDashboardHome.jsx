import React from 'react'
import { Users, ListChecks, DollarSign, Clock } from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className='bg-white p-6 rounded-xl shadow-md border-t-4' style={{ borderColor: color}}>
        <div className='flex items-center justify-between'>
            <div>
                <p className='text-sm font-medium text-gray-500'>{title}</p>
                <p className='text-3xl font-extrabold text-gray-900 mt-1'>{value}</p>
            </div>
            <div className={`p-3 rounded-full ${color === '#4F46E5' ? 'bg-indigo-100' : color === '#10B981' ? 'bg-green-100' : color === '#F59E0B' ? 'bg-yellow-100' : 'bg-red-100' }`}>
                <Icon className={`w-8 h-8`} style={{ color: color}} />
            </div>
        </div>
    </div>
)
const AdminDashboardHome = () => {
    const stats = [
        { title: 'Total Students', value: '850', icon: Users, color: '#4F46E5' },
        { title: 'Applications Reviewed', value: '342', icon: ListChecks, color: '#10B981' },
        { title: 'Funds Disbursed (₹)', value: '1.2 Cr', icon: DollarSign, color: '#F59E0B' },
        { title: 'Pending Reviews', value: '48', icon: Clock, color: '#EF4444' },
    ]
  return (
    <div className='space-y-8'>
        <h1 className='text-3xl font-extrabold text-gray-900'>Admin Overview</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
            ))}
        </div>

        <div className='bg-white p-6 rounded-xl shadow-lg'>
            <h2 className='text-xl font-semibold text-gray-800 border-b pb-3 mb-4'>Quick Links & Reminders</h2>
            <ul className='space-y-2 text-gray-600'>
                <li>- **ACTION REQUIRED:** 12 applications are currently marked "Reverted for Correction."</li>
                <li>- **DEADLINE:** Merit Grant scheme deadline is in 15 days.</li>
                <li>- Review **Manage Applications** daily for pending reviews.</li>
            </ul>
        </div>
    </div>
  )
}

export default AdminDashboardHome