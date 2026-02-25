import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getTeamLeaves } from '../services/leave.service';
import SummaryCard from '../components/ui/SummaryCard';
import { Users, Clock, CheckCircle } from 'lucide-react';
import DashboardCharts from '../components/DashboardCharts';

const ManagerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const data = await getTeamLeaves();
                setLeaves(data || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaves();
    }, []);

    if (loading) return <div className="flex justify-center p-8">Loading dashboard...</div>;

    const pendingLeaves = leaves.filter(l => l.status === 'pending').length;
    const approvedLeaves = leaves.filter(l => l.status === 'approved').length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Manager Dashboard</h1>
                <p className="text-charcoal-500 dark:text-charcoal-400">Overview of your team's leaves</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            </div>

            <div className="bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm mt-8">
                <h3 className="text-lg font-bold mb-4">Team Leave Distribution</h3>
                <DashboardCharts leaves={leaves} />
            </div>
        </div>
    );
};

export default ManagerDashboard;
