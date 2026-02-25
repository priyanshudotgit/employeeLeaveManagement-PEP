import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTeamLeaves, getMyLeaves } from '../services/leave.service';
import { getMyReimbursements } from '../services/reimbursement.service';
import SummaryCard from '../components/ui/SummaryCard';
import { Users, Clock, CheckCircle } from 'lucide-react';
import DashboardCharts from '../components/DashboardCharts';
import ActivityFeed from '../components/ActivityFeed';
import { motion } from 'framer-motion';

import DashboardSkeleton from '../components/ui/DashboardSkeleton';

const ManagerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [leaves, setLeaves] = useState([]);
    const [myLeaves, setMyLeaves] = useState([]);
    const [reimbursements, setReimbursements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [leaveData, myLeaveData, reimbData] = await Promise.all([
                    getTeamLeaves(),
                    getMyLeaves(),
                    getMyReimbursements()
                ]);
                setLeaves(leaveData || []);
                setMyLeaves(myLeaveData || []);
                setReimbursements(reimbData || []);
            } catch (error) {
                console.error('Failed to fetch manager dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <DashboardSkeleton />;

    const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
    const approvedLeaves = leaves.filter(l => l.status === 'approved').length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-charcoal-900 dark:text-white">Manager Dashboard</h1>
                <p className="text-charcoal-500 dark:text-charcoal-400 mt-1">Overview of your team's leaves and pending approvals.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <SummaryCard
                    title="Total Team Leaves"
                    value={leaves.length}
                    icon={<Users size={28} />}
                    colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
                />
                <SummaryCard
                    title="Pending Approvals"
                    value={pendingLeaves}
                    icon={<Clock size={28} />}
                    colorClass="bg-gradient-to-br from-amber-400 to-orange-500"
                />
                <SummaryCard
                    title="Approved Leaves"
                    value={approvedLeaves}
                    icon={<CheckCircle size={28} />}
                    colorClass="bg-gradient-to-br from-emerald-400 to-teal-500"
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white dark:bg-charcoal-950 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm"
                >
                    <h3 className="text-xl font-bold tracking-tight mb-6">Team Leave Distribution</h3>
                    <DashboardCharts leaves={leaves} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white dark:bg-charcoal-950 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm"
                >
                    <h3 className="text-xl font-bold tracking-tight mb-6">Team Activity</h3>
                    <ActivityFeed leaves={leaves} reimbursements={reimbursements} />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-charcoal-950 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm mt-8"
            >
                <h3 className="text-xl font-bold tracking-tight mb-6">Recent Leave History</h3>
                {myLeaves.length === 0 ? (
                    <p className="text-charcoal-500">No leave requests found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-charcoal-200 dark:border-charcoal-800 text-charcoal-500 dark:text-charcoal-400">
                                    <th className="py-3 px-4">Type</th>
                                    <th className="py-3 px-4">Dates</th>
                                    <th className="py-3 px-4">Reason</th>
                                    <th className="py-3 px-4">Manager</th>
                                    <th className="py-3 px-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myLeaves.map(l => (
                                    <tr key={l._id} className="border-b border-charcoal-100 dark:border-charcoal-800/50">
                                        <td className="py-3 px-4">{l.leaveType}</td>
                                        <td className="py-3 px-4 text-sm text-charcoal-500 dark:text-charcoal-400">
                                            {new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4 text-sm w-48 truncate" title={l.reason}>{l.reason}</td>
                                        <td className="py-3 px-4 font-medium">{l.managerId ? l.managerId.name : 'Unknown'}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium uppercase
                                                ${l.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                    l.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}
                                            >
                                                {l.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ManagerDashboard;
