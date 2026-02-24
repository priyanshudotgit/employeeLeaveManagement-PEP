import { useState, useEffect } from 'react';
import api from '../services/api';
import { getTeamLeaves } from '../services/leave.service';
import { getAllReimbursements } from '../services/reimbursement.service';
import SummaryCard from '../components/ui/SummaryCard';
import { Users, Calendar, ReceiptText, ShieldAlert } from 'lucide-react';
import DashboardCharts from '../components/DashboardCharts';

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

    if (loading) return <div className="flex justify-center p-8">Loading dashboard...</div>;

    const { users, leaves, reimbursements } = data;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-charcoal-500 dark:text-charcoal-400">System overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SummaryCard
                    title="Total Users"
                    value={users.length}
                    icon={<Users size={24} />}
                    colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500"
                />
                <SummaryCard
                    title="Total Leaves"
                    value={leaves.length}
                    icon={<Calendar size={24} />}
                    colorClass="bg-charcoal-100 text-charcoal-600 dark:bg-charcoal-800 dark:text-charcoal-400"
                />
                <SummaryCard
                    title="Total Reimbursements"
                    value={reimbursements.length}
                    icon={<ReceiptText size={24} />}
                    colorClass="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500"
                />
                <SummaryCard
                    title="Pending Approvals"
                    value={leaves.filter(l => l.status === 'pending').length}
                    icon={<ShieldAlert size={24} />}
                    colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm">
                    <h3 className="text-lg font-bold mb-4">Leave Distribution</h3>
                    <DashboardCharts leaves={leaves} />
                </div>
                <div className="bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm flex flex-col justify-center">
                    <h3 className="text-lg font-bold mb-4">User Roles Breakdown</h3>
                    <p className="text-sm text-charcoal-500 mb-4">Overview of roles in the system.</p>
                    <div className="space-y-4">
                        {['admin', 'manager', 'employee'].map(role => (
                            <div key={role} className="flex justify-between items-center p-3 bg-charcoal-50 dark:bg-charcoal-900 rounded-lg">
                                <span className="capitalize font-medium text-charcoal-700 dark:text-charcoal-300">{role}s</span>
                                <span className="font-bold text-xl">{users.filter(u => u.role === role).length}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
