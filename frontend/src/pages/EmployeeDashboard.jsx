import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getMyLeaves } from '../services/leave.service';
import { getMyReimbursements } from '../services/reimbursement.service';
import SummaryCard from '../components/ui/SummaryCard';
import { Calendar, ReceiptText, CheckCircle, Clock } from 'lucide-react';
import DashboardCharts from '../components/DashboardCharts';

const EmployeeDashboard = () => {
    const { user } = useContext(AuthContext);
    const [leaves, setLeaves] = useState([]);
    const [reimbursements, setReimbursements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [leavesData, reimbData] = await Promise.all([
                    getMyLeaves(),
                    getMyReimbursements()
                ]);
                setLeaves(leavesData || []);
                setReimbursements(reimbData || []);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center p-8">Loading dashboard...</div>;

    const totalLeaves = leaves.length;
    const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
    const approvedLeaves = leaves.filter(l => l.status === 'approved').length;

    const pendingReimb = reimbursements.filter(r => r.status === 'pending').length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
                <p className="text-charcoal-500 dark:text-charcoal-400">Here's your employee overview</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <SummaryCard
                    title="Total Leaves"
                    value={totalLeaves}
                    icon={<Calendar size={28} />}
                    colorClass="bg-gradient-to-br from-blue-500 to-indigo-600"
                />
                <SummaryCard
                    title="Pending Leaves"
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
                <SummaryCard
                    title="Pending Reimbursements"
                    value={pendingReimb}
                    icon={<ReceiptText size={28} />}
                    colorClass="bg-gradient-to-br from-purple-500 to-pink-600"
                />
            </div>

            <div className="bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm mt-8">
                <h3 className="text-lg font-bold mb-4">Leave Distribution</h3>
                <DashboardCharts leaves={leaves} />
            </div>

            <div className="bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm mt-8">
                <h3 className="text-lg font-bold mb-4">My Applied Leaves</h3>
                {leaves.length === 0 ? (
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
                                {leaves.map(l => (
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
            </div>
        </div>
    );
};

export default EmployeeDashboard;
