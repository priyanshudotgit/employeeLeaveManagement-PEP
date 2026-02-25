import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const user = await login(formData);
            toast.success('Welcome back!');
            navigate(`/${user.role}/dashboard`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-charcoal-950 transition-colors">

            {/* Left Side - Marketing Graphic */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-emerald-900 p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute -top-[50%] -right-[50%] w-[150%] h-[150%] bg-gradient-to-b from-emerald-500/20 to-transparent rounded-full blur-3xl transform rotate-12"></div>

                <div className="relative z-10 flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                        <Calendar size={20} className="text-white" />
                    </div>
                    LumisHR
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            Manage your workspace <span className="text-emerald-400">effortlessly.</span>
                        </h1>
                        <p className="text-lg text-emerald-50/70 mb-8">
                            Join thousands of forward-thinking workspaces streamlining their leaves, approvals, and reimbursements in one unified platform.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-emerald-50/80">
                                <ShieldCheck className="text-emerald-400" size={24} />
                                <span>Enterprise-grade role based access controls</span>
                            </div>
                            <div className="flex items-center gap-3 text-emerald-50/80">
                                <Zap className="text-amber-400" size={24} />
                                <span>Lightning fast approval workflows</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="relative z-10 text-sm text-emerald-50/50">
                    © 2026 LumisHR Technologies
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
                {/* Mobile/Tablet Logo (hidden on desktop) */}
                <div className="absolute top-8 left-8 flex lg:hidden items-center gap-2 text-charcoal-900 dark:text-white font-bold text-2xl tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                        <Calendar size={20} className="text-white" />
                    </div>
                    LumisHR
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-2">Welcome Back</h2>
                        <p className="text-charcoal-500 dark:text-charcoal-400">Enter your credentials to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Input
                            label="Corporate Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@company.com"
                            className="bg-charcoal-50 dark:bg-charcoal-900 border-transparent focus:bg-white dark:focus:bg-charcoal-950"
                        />
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="bg-charcoal-50 dark:bg-charcoal-900 border-transparent focus:bg-white dark:focus:bg-charcoal-950"
                        />

                        <div className="flex items-center justify-between text-sm mt-1 mb-4">
                            <label className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-400 cursor-pointer">
                                <input type="checkbox" className="rounded border-charcoal-300 dark:border-charcoal-700 text-emerald-500 focus:ring-emerald-500 bg-transparent" />
                                Remember me
                            </label>
                            <Link to="#" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">Forgot password?</Link>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full gap-2 text-lg py-4">
                            {loading ? 'Authenticating...' : 'Sign In'}
                            {!loading && <ArrowRight size={18} />}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-charcoal-500 dark:text-charcoal-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 font-bold transition-colors">
                            Request access
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
