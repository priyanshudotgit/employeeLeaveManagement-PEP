import { useState, useEffect } from 'react';
import { getMyReimbursements, submitReimbursement } from '../services/reimbursement.service';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Reimbursements = () => {
    const [reimbursements, setReimbursements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({ title: '', description: '', amount: '' });

    const fetchReimbursements = async () => {
        try {
            const data = await getMyReimbursements();
            setReimbursements(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReimbursements();
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await submitReimbursement({ ...formData, amount: Number(formData.amount) });
            toast.success('Reimbursement submitted');
            setFormData({ title: '', description: '', amount: '' });
            fetchReimbursements();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit reimbursement');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm mt-4">
                <h2 className="text-xl font-bold mb-6">Request Reimbursement</h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl border-b border-charcoal-100 dark:border-charcoal-800 pb-8">
                    <Input label="Title" name="title" value={formData.title} onChange={handleChange} required placeholder="E.g., Travel Expense" />
                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows={3} className="px-4 py-2.5 rounded-lg border bg-white dark:bg-charcoal-950 text-charcoal-900 border-charcoal-200 dark:border-charcoal-800 dark:text-charcoal-50" />
                    </div>
                    <Input label="Amount ($)" type="number" name="amount" value={formData.amount} onChange={handleChange} required min="1" />

                    <Button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Request'}</Button>
                </form>

                <h2 className="text-xl font-bold mt-8 mb-4">My Requests</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : reimbursements.length === 0 ? (
                    <p className="text-charcoal-500">No reimbursements found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-charcoal-200 dark:border-charcoal-800 text-charcoal-500 dark:text-charcoal-400">
                                    <th className="py-3 px-4">Title</th>
                                    <th className="py-3 px-4">Amount</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reimbursements.map(r => (
                                    <tr key={r._id} className="border-b border-charcoal-100 dark:border-charcoal-800/50">
                                        <td className="py-3 px-4 font-medium">{r.title}</td>
                                        <td className="py-3 px-4">${r.amount}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 rounded text-xs font-medium uppercase
                        ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                                                    r.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}
                                            >
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-charcoal-500">{new Date(r.createdAt).toLocaleDateString()}</td>
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
export default Reimbursements;
