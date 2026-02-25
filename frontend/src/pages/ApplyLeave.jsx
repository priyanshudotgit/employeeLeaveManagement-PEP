import { useState } from 'react';
import { applyLeave } from '../services/leave.service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ApplyLeave = () => {
    const [formData, setFormData] = useState({ leaveType: 'Sick', startDate: '', endDate: '', reason: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await applyLeave(formData);
            toast.success('Leave applied successfully');
            navigate('/employee/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to apply for leave');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm mt-4 transition-colors">
            <h2 className="text-2xl font-bold mb-6">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Leave Type</label>
                    <select
                        name="leaveType"
                        value={formData.leaveType}
                        onChange={handleChange}
                        className="px-4 py-2.5 rounded-lg border bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-50 border-charcoal-200 dark:border-charcoal-800 hover:border-charcoal-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    >
                        <option value="Sick">Sick Leave</option>
                        <option value="Casual">Casual Leave</option>
                        <option value="Annual">Annual Leave</option>
                        <option value="Unpaid">Unpaid Leave</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                    <Input label="End Date" type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                    <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Reason</label>
                    <textarea
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="px-4 py-2.5 rounded-lg border bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-50 border-charcoal-200 dark:border-charcoal-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full mt-4">
                    {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
            </form>
        </div>
    );
};
export default ApplyLeave;
