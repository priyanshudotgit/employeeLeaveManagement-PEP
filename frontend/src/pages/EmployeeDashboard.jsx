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
                    icon={<Calendar size={24} />}
                    colorClass="bg-charcoal-100 text-charcoal-600 dark:bg-charcoal-800 dark:text-charcoal-400"
                />
                <SummaryCard
                    title="Pending Leaves"
                    value={pendingLeaves}
                    icon={<Clock size={24} />}
                    colorClass="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-500"
                />
                <SummaryCard
                    title="Approved Leaves"
                    value={approvedLeaves}
                    icon={<CheckCircle size={24} />}
                    colorClass="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-500"
                />
                <SummaryCard
                    title="Pending Reimbursements"
                    value={pendingReimb}
                    icon={<ReceiptText size={24} />}
                    colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-500"
                />
            </div>

            <div className="bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm mt-8">
                <h3 className="text-lg font-bold mb-4">Leave Distribution</h3>
                <DashboardCharts leaves={leaves} />
            </div>
        </div>
    );
};

export default EmployeeDashboard;
