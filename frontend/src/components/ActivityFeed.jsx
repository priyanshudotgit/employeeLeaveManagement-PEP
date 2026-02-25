import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Receipt } from 'lucide-react';

const ActivityFeed = ({ leaves = [], reimbursements = [] }) => {
    // Combine and sort by createdAt descending
    const activities = [
        ...leaves.map(l => ({ ...l, type: 'leave', date: new Date(l.createdAt) })),
        ...reimbursements.map(r => ({ ...r, type: 'reimbursement', date: new Date(r.createdAt) }))
    ].sort((a, b) => b.date - a.date).slice(0, 5); // Take top 5 recent actions

    if (activities.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-charcoal-400 dark:text-charcoal-600">
                <Clock size={32} className="mb-2 opacity-50" />
                <p>No recent activity</p>
            </div>
        );
    }

    const getActivityIcon = (item) => {
        if (item.status === 'approved') return <CheckCircle size={18} className="text-emerald-500" />;
        if (item.status === 'rejected') return <XCircle size={18} className="text-red-500" />;
        return <Clock size={18} className="text-amber-500" />;
    };

    const getActivityText = (item) => {
        if (item.type === 'leave') {
            return (
                <p className="text-sm font-medium text-charcoal-900 dark:text-charcoal-100">
                    Leave Request <span className="text-charcoal-500 dark:text-charcoal-400 font-normal">({item.leaveType})</span> was
                    <span className={`ml-1 ${item.status === 'approved' ? 'text-emerald-600' : item.status === 'rejected' ? 'text-red-600' : 'text-amber-600'}`}>
                        {item.status}
                    </span>
                </p>
            );
        } else {
            return (
                <p className="text-sm font-medium text-charcoal-900 dark:text-charcoal-100">
                    Reimbursement <span className="text-charcoal-500 dark:text-charcoal-400 font-normal">(${item.amount})</span> was
                    <span className={`ml-1 ${item.status === 'approved' ? 'text-emerald-600' : item.status === 'rejected' ? 'text-red-600' : 'text-amber-600'}`}>
                        {item.status}
                    </span>
                </p>
            );
        }
    };

    return (
        <div className="space-y-4">
            {activities.map((activity, index) => (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    key={activity._id || index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-charcoal-50 hover:bg-charcoal-100 dark:bg-charcoal-900/50 dark:hover:bg-charcoal-800 transition-colors border border-transparent dark:border-charcoal-800"
                >
                    <div className={`p-2 rounded-full ${activity.type === 'leave' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30'}`}>
                        {activity.type === 'leave' ? <Clock size={16} /> : <Receipt size={16} />}
                    </div>

                    <div className="flex-1">
                        {getActivityText(activity)}
                        <p className="text-xs text-charcoal-400 mt-1 flex items-center gap-1">
                            {getActivityIcon(activity)}
                            {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ActivityFeed;
