import { useState, useEffect } from 'react';
import { getTeamLeaves, approveLeave, rejectLeave } from '../services/leave.service';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';

const ManagerLeaves = () => {
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaves = async () => {
        try {
            const data = await getTeamLeaves();
            setLeaves(data);
        } catch (error) {
            toast.error('Failed to load leaves');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const handleAction = async (id, action) => {
        try {
            if (action === 'approve') await approveLeave(id);
            if (action === 'reject') await rejectLeave(id);
            toast.success(`Leave ${action}d successfully`);
            fetchLeaves();
        } catch (error) {
            toast.error(`Failed to ${action} leave`);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Team Leaves</h2>

            <div className="bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm">
                {loading ? (
                    <p>Loading...</p>
                ) : leaves.length === 0 ? (
                    <p className="text-charcoal-500">No team leave requests found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-charcoal-200 dark:border-charcoal-800 text-charcoal-500 dark:text-charcoal-400">
                                    <th className="py-3 px-4">Employee</th>
                                    <th className="py-3 px-4">Type</th>
                                    <th className="py-3 px-4">Dates</th>
                                    <th className="py-3 px-4">Reason</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaves.map(l => (
                                    <tr key={l._id} className="border-b border-charcoal-100 dark:border-charcoal-800/50">
                                        <td className="py-3 px-4 font-medium">{l.employeeId?.name || 'Unknown'}</td>
                                        <td className="py-3 px-4">{l.leaveType}</td>
                                        <td className="py-3 px-4 text-sm text-charcoal-500 dark:text-charcoal-400">
                                            {new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()}
                                        </td>
                                        <td className="py-3 px-4 text-sm w-48 truncate" title={l.reason}>{l.reason}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium uppercase
                        ${l.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                    l.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}
                                            >
                                                {l.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {l.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <Button onClick={() => handleAction(l._id, 'approve')} variant="primary" className="text-xs px-3 py-1.5">Approve</Button>
                                                    <Button onClick={() => handleAction(l._id, 'reject')} variant="danger" className="text-xs px-3 py-1.5">Reject</Button>
                                                </div>
                                            )}
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
export default ManagerLeaves;
