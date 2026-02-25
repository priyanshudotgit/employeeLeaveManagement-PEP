const TableSkeleton = ({ rows = 5 }) => {
    return (
        <div className="w-full animate-pulse space-y-3 mt-4">
            <div className="w-full flex gap-4 pb-3 border-b border-charcoal-200 dark:border-charcoal-800">
                <div className="h-6 bg-charcoal-200 dark:bg-charcoal-800 rounded w-1/4"></div>
                <div className="h-6 bg-charcoal-200 dark:bg-charcoal-800 rounded w-1/4"></div>
                <div className="h-6 bg-charcoal-200 dark:bg-charcoal-800 rounded w-1/4"></div>
                <div className="h-6 bg-charcoal-200 dark:bg-charcoal-800 rounded w-1/4"></div>
            </div>
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="w-full flex gap-4 py-2 border-b border-charcoal-100 dark:border-charcoal-800/50">
                    <div className="h-8 bg-charcoal-100 dark:bg-charcoal-800/80 rounded w-1/4"></div>
                    <div className="h-8 bg-charcoal-100 dark:bg-charcoal-800/80 rounded w-1/4"></div>
                    <div className="h-8 bg-charcoal-100 dark:bg-charcoal-800/80 rounded w-1/4"></div>
                    <div className="h-8 bg-charcoal-100 dark:bg-charcoal-800/80 rounded w-1/4"></div>
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;
