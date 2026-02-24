const SummaryCard = ({ title, value, icon, colorClass }) => {
    return (
        <div className="bg-white dark:bg-charcoal-950 p-6 rounded-xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm flex items-center gap-4 transition-colors">
            <div className={`p-4 rounded-lg ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-charcoal-500 dark:text-charcoal-400 font-medium">{title}</p>
                <h3 className="text-2xl font-bold mt-1 text-charcoal-900 dark:text-charcoal-50">{value}</h3>
            </div>
        </div>
    );
};
export default SummaryCard;
