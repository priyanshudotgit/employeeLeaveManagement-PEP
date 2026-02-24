import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DashboardCharts = ({ leaves = [] }) => {
    const statusCounts = leaves.reduce((acc, leave) => {
        acc[leave.status] = (acc[leave.status] || 0) + 1;
        return acc;
    }, { pending: 0, approved: 0, rejected: 0 });

    const data = [
        { name: 'Pending', value: statusCounts.pending, color: '#f59e0b' },
        { name: 'Approved', value: statusCounts.approved, color: '#10b981' },
        { name: 'Rejected', value: statusCounts.rejected, color: '#ef4444' },
    ].filter(item => item.value > 0);

    if (leaves.length === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-charcoal-400">
                No leave data available for charts.
            </div>
        );
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardCharts;
