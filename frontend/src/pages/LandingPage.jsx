import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, ReceiptText, ShieldCheck, PieChart, ArrowRight, CheckCircle2 } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-charcoal-50 dark:bg-charcoal-950 font-sans selection:bg-emerald-500/30">
            {/* Minimal Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-charcoal-900/80 backdrop-blur-md border-b border-charcoal-200 dark:border-charcoal-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400 font-bold text-2xl tracking-tight">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                            <Calendar size={20} className="text-white" />
                        </div>
                        LumisHR
                    </div>
                    <div className="flex items-center gap-3 sm:gap-6">
                        <ThemeToggle />
                        <Link to="/login" className="hidden sm:block text-sm font-medium text-charcoal-600 dark:text-charcoal-300 hover:text-charcoal-900 dark:hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link to="/login" className="text-sm font-medium px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-900 hover:bg-charcoal-800 dark:hover:bg-charcoal-100 transition-all shadow-md hover:shadow-lg whitespace-nowrap">
                            <span className="hidden sm:inline">Get Started Free</span>
                            <span className="sm:hidden">Get Started</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        LumisHR 2.0 is now live
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-charcoal-900 dark:text-white tracking-tight leading-[1.15] md:leading-[1.1] mb-6 md:mb-8"
                    >
                        Modern HR, <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">
                            simplified effortlessly.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-charcoal-500 dark:text-charcoal-400 mb-10 leading-relaxed max-w-2xl mx-auto"
                    >
                        A beautiful unified platform to manage employee leaves, track expenses, and orchestrate role-based approvals without the corporate clutter.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
                            Start Managing Now
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Dashboard Mockup Display */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 md:pb-32"
            >
                <div className="relative rounded-2xl overflow-hidden border border-charcoal-200 dark:border-charcoal-800 shadow-2xl bg-white dark:bg-charcoal-900 p-2 sm:p-4 aspect-square sm:aspect-video">
                    {/* Simulated OS Header */}
                    <div className="flex items-center gap-2 mb-4 px-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    {/* Minimal Dashboard Skeleton representation */}
                    <div className="flex gap-4 h-[calc(100%-2rem)]">
                        <div className="w-48 xl:w-64 bg-charcoal-50 dark:bg-charcoal-950 rounded-xl p-4 hidden md:flex flex-col gap-4">
                            <div className="h-8 bg-charcoal-200 dark:bg-charcoal-800 rounded-md w-3/4 mb-4"></div>
                            <div className="h-4 bg-charcoal-200 dark:bg-charcoal-800 rounded-md w-full"></div>
                            <div className="h-4 bg-charcoal-200 dark:bg-charcoal-800 rounded-md w-5/6"></div>
                            <div className="h-4 bg-charcoal-200 dark:bg-charcoal-800 rounded-md w-full"></div>
                        </div>
                        <div className="flex-1 flex flex-col gap-3 sm:gap-4 overflow-hidden">
                            <div className="h-10 sm:h-16 bg-charcoal-50 dark:bg-charcoal-950 rounded-xl w-full shrink-0"></div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 shrink-0">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className={`h-16 sm:h-24 rounded-xl opacity-90 ${['bg-indigo-500', 'bg-amber-500', 'bg-emerald-500', 'bg-purple-500'][i - 1]}`}></div>
                                ))}
                            </div>
                            <div className="hidden sm:flex flex-1 bg-charcoal-50 dark:bg-charcoal-950 rounded-xl p-3 sm:p-4 min-h-[100px]">
                                <div className="h-full w-full border border-dashed border-charcoal-200 dark:border-charcoal-800 rounded-lg flex items-center justify-center p-4 text-center">
                                    <p className="text-charcoal-400 dark:text-charcoal-600 font-medium tracking-widest uppercase text-xs sm:text-sm">Beautiful Analytics Inside</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Features Section */}
            <div className="bg-white dark:bg-charcoal-900 py-20 md:py-32 border-y border-charcoal-200 dark:border-charcoal-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12 md:mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">Everything you need to run your team.</h2>
                        <p className="text-base md:text-lg text-charcoal-500 dark:text-charcoal-400 max-w-2xl mx-auto">No bloated enterprise tools. Just the core HR functionality your company actually uses every day, packaged beautifully.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        <FeatureCard
                            icon={<Calendar size={24} />}
                            title="Time Off Tracking"
                            description="Employees request leaves. Managers approve them. Balances update instantly. It's that simple."
                            color="text-emerald-500"
                            bg="bg-emerald-100 dark:bg-emerald-500/10"
                        />
                        <FeatureCard
                            icon={<ReceiptText size={24} />}
                            title="Expense Management"
                            description="Submit receipts and descriptions. Get reimbursed cleanly with a transparent paper trail."
                            color="text-purple-500"
                            bg="bg-purple-100 dark:bg-purple-500/10"
                        />
                        <FeatureCard
                            icon={<ShieldCheck size={24} />}
                            title="Role-Based Workflows"
                            description="Employees, Managers, and Admins. Built-in permission models so the right people see the right data."
                            color="text-amber-500"
                            bg="bg-amber-100 dark:bg-amber-500/10"
                        />
                        <FeatureCard
                            icon={<PieChart size={24} />}
                            title="Visual Analytics"
                            description="Beautiful built-in charts help you understand leave trends and team absence distributions at a glance."
                            color="text-indigo-500"
                            bg="bg-indigo-100 dark:bg-indigo-500/10"
                        />
                        <FeatureCard
                            icon={<CheckCircle2 size={24} />}
                            title="SaaS Grade UI"
                            description="No more ugly corporate portals. Enjoy your work with fluid animations, dark mode, and a stunning palette."
                            color="text-rose-500"
                            bg="bg-rose-100 dark:bg-rose-500/10"
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-charcoal-50 dark:bg-charcoal-950 py-12 border-t border-charcoal-200 dark:border-charcoal-800">
                <div className="max-w-7xl mx-auto px-6 text-center text-charcoal-500 dark:text-charcoal-400">
                    <div className="flex items-center justify-center gap-2 font-bold text-xl tracking-tight text-charcoal-900 dark:text-white mb-6">
                        <Calendar size={20} className="text-emerald-500" />
                        LumisHR
                    </div>
                    <p>© 2026 LumisHR. Built for modern workspaces.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, color, bg }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="p-8 rounded-2xl bg-charcoal-50 dark:bg-charcoal-950 border border-charcoal-200 dark:border-charcoal-800 transition-all hover:shadow-xl hover:border-charcoal-300 dark:hover:border-charcoal-700"
    >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${bg} ${color}`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-charcoal-500 dark:text-charcoal-400 leading-relaxed">{description}</p>
    </motion.div>
);

export default LandingPage;
