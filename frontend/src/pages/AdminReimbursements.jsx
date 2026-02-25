import { useState, useEffect } from 'react';
import { getAllReimbursements, resolveReimbursement } from '../services/reimbursement.service';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import { motion } from 'framer-motion';
import TableSkeleton from '../components/ui/TableSkeleton';

const AdminReimbursements = () => {
    const [reimbursements, setReimbursements] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReimbursements = async () => {
        try {
            const data = await getAllReimbursements();
            setReimbursements(data);
        } catch (error) {
            toast.error('Failed to load reimbursements');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReimbursements();
    }, []);

    const handleAction = async (id, status) => {
        try {
            await resolveReimbursement(id, status);
            toast.success(`Reimbursement ${status} successfully`);
            fetchReimbursements();
        } catch (error) {
            toast.error('Failed to resolve reimbursement');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-charcoal-900 dark:text-white">Manage Reimbursements</h2>
                <p className="text-charcoal-500 dark:text-charcoal-400 mt-1">Review and approve company-wide claims.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-charcoal-950 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm"
            >
                {loading ? (
                    <TableSkeleton rows={4} />
                ) : reimbursements.length === 0 ? (
                    <p className="text-charcoal-500">No reimbursement requests found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-charcoal-200 dark:border-charcoal-800 text-charcoal-500 dark:text-charcoal-400">
                                    <th className="py-3 px-4">Employee</th>
                                    <th className="py-3 px-4">Title</th>
                                    <th className="py-3 px-4">Amount</th>
                                    <th className="py-3 px-4">Description</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reimbursements.map(r => (
                                    <tr key={r._id} className="border-b border-charcoal-100 dark:border-charcoal-800/50">
                                        <td className="py-3 px-4 font-medium">{r.employeeId?.name || 'Unknown'}</td>
                                        <td className="py-3 px-4 font-medium">{r.title}</td>
                                        <td className="py-3 px-4">${r.amount}</td>
                                        <td className="py-3 px-4 text-sm w-48 truncate" title={r.description}>{r.description}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium uppercase
                        ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                    r.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}
                                            >
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            {r.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <Button onClick={() => handleAction(r._id, 'approved')} variant="primary" className="text-xs px-3 py-1.5">Approve</Button>
                                                    <Button onClick={() => handleAction(r._id, 'rejected')} variant="danger" className="text-xs px-3 py-1.5">Reject</Button>
                                                </div>
                                            )}
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
export default AdminReimbursements;
