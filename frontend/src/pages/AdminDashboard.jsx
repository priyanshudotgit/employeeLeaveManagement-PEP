import { useState, useEffect } from 'react';
import api from '../services/api';
import { getTeamLeaves } from '../services/leave.service';
import { getAllReimbursements } from '../services/reimbursement.service';
import SummaryCard from '../components/ui/SummaryCard';
import { Users, Calendar, ReceiptText, ShieldAlert } from 'lucide-react';
import DashboardCharts from '../components/DashboardCharts';
import { motion } from 'framer-motion';

import DashboardSkeleton from '../components/ui/DashboardSkeleton';

const AdminDashboard = () => {
    const [data, setData] = useState({ users: [], leaves: [], reimbursements: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, leaves, reimbursements] = await Promise.all([
                    api.get('/users'),
                    getTeamLeaves(),
                    getAllReimbursements()
                ]);
                setData({ users: usersRes.data || [], leaves: leaves || [], reimbursements: reimbursements || [] });
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <DashboardSkeleton />;

    const { users, leaves, reimbursements } = data;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-charcoal-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-charcoal-500 dark:text-charcoal-400 mt-1">System overview and administrative controls.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            >
                <SummaryCard
                    title="Total Users"
                    value={users.length}
                    icon={<Users size={28} />}
                    colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
                />
                <SummaryCard
                    title="Total Leaves"
                    value={leaves.length}
                    icon={<Calendar size={28} />}
                    colorClass="bg-gradient-to-br from-purple-500 to-pink-600"
                />
                <SummaryCard
                    title="Total Reimbursements"
                    value={reimbursements.length}
                    icon={<ReceiptText size={28} />}
                    colorClass="bg-gradient-to-br from-amber-400 to-orange-500"
                />
                <SummaryCard
                    title="Pending Approvals"
                    value={leaves.filter(l => l.status === 'pending').length}
                    icon={<ShieldAlert size={28} />}
                    colorClass="bg-gradient-to-br from-emerald-400 to-teal-500"
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-charcoal-950 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm"
                >
                    <h3 className="text-xl font-bold tracking-tight mb-6">Leave Distribution</h3>
                    <DashboardCharts leaves={leaves} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-charcoal-950 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm flex flex-col justify-center"
                >
                    <h3 className="text-xl font-bold tracking-tight mb-2">User Roles Breakdown</h3>
                    <p className="text-sm text-charcoal-500 dark:text-charcoal-400 mb-6">Overview of role distribution across the platform.</p>
                    <div className="space-y-4">
                        {['admin', 'manager', 'employee'].map((role, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                key={role}
                                className="flex justify-between items-center p-4 bg-charcoal-50 dark:bg-charcoal-900 rounded-xl"
                            >
                                <span className="capitalize font-medium text-charcoal-700 dark:text-charcoal-300 flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${role === 'admin' ? 'bg-indigo-500' : role === 'manager' ? 'bg-emerald-500' : 'bg-charcoal-400'}`}></div>
                                    {role}s
                                </span>
                                <span className="font-bold text-xl">{users.filter(u => u.role === role).length}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AdminDashboard;
