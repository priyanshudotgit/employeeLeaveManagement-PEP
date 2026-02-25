import { motion } from 'framer-motion';

const DashboardSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 animate-pulse mt-2"
        >
            <div className="mb-8">
                <div className="h-8 bg-charcoal-200 dark:bg-charcoal-800 rounded w-1/3 md:w-1/4 mb-3"></div>
                <div className="h-4 bg-charcoal-200 dark:bg-charcoal-800 rounded w-2/3 md:w-1/3"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-charcoal-200 dark:bg-charcoal-800/80 rounded-2xl"></div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-1 h-[320px] bg-charcoal-200 dark:bg-charcoal-800/80 rounded-2xl"></div>
                <div className="lg:col-span-2 h-[320px] bg-charcoal-200 dark:bg-charcoal-800/80 rounded-2xl"></div>
            </div>

            <div className="mt-8">
                <div className="h-64 bg-charcoal-200 dark:bg-charcoal-800/80 rounded-2xl"></div>
            </div>
        </motion.div>
    );
};

export default DashboardSkeleton;
