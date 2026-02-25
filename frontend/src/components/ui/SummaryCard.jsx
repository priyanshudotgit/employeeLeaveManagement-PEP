const SummaryCard = ({ title, value, icon, colorClass }) => {
    return (
        <div className={`p-6 rounded-xl border border-white/10 shadow-lg flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-xl ${colorClass} `}>
            <div className="p-3 bg-white/20 rounded-lg text-white backdrop-blur-sm">
                {icon}
            </div>
            <div>
                <p className="text-sm text-white/90 font-medium tracking-wide">{title}</p>
                <h3 className="text-3xl font-bold mt-1 text-white">{value}</h3>
            </div>
        </div>
    );
};
export default SummaryCard;
