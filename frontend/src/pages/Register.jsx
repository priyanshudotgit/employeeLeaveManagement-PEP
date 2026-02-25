import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, CheckCircle2, LayoutDashboard } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'employee' });
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(formData);
            toast.success('Account created! Please wait for admin approval.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-charcoal-950 transition-colors">

            {/* Left Side - Marketing Graphic */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-900 via-charcoal-900 to-indigo-950 p-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="absolute -bottom-[50%] -left-[50%] w-[150%] h-[150%] bg-gradient-to-t from-indigo-500/20 to-transparent rounded-full blur-3xl transform -rotate-12"></div>

                <div className="relative z-10 flex items-center gap-2 text-white font-bold text-2xl tracking-tight">
                    <div className="h-8 rounded-lg bg-linear-to-r bg-gradient-to-br from-indigo-650 via-charcoal-800 to-indigo-900 flex items-center justify-center p-5">
                        ELMS
                    </div>
                </div>

                <div className="relative z-10 max-w-lg">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            Start building a better <span className="text-indigo-400">future of work.</span>
                        </h1>
                        <p className="text-lg text-indigo-50/70 mb-8">
                            Set up your profile in seconds and instantly gain access to the most elegantly designed HR workflow tool on the market.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-indigo-50/80">
                                <CheckCircle2 className="text-emerald-400" size={24} />
                                <span>Seamless onboarding process</span>
                            </div>
                            <div className="flex items-center gap-3 text-indigo-50/80">
                                <LayoutDashboard className="text-indigo-400" size={24} />
                                <span>Access incredibly beautiful dashboards</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="relative z-10 text-sm text-indigo-50/50">
                    © Employee Leave Management System
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
                {/* Mobile/Tablet Logo (hidden on desktop) */}
                <div className="absolute top-8 left-8 flex lg:hidden items-center gap-2 text-charcoal-900 dark:text-white font-bold text-2xl tracking-tight">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                        <Calendar size={20} className="text-white" />
                    </div>
                    LumisHR
                </div>

                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md my-auto pt-16 lg:pt-0"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-charcoal-900 dark:text-white mb-2">Create an account</h2>
                        <p className="text-charcoal-500 dark:text-charcoal-400">Fill in your details to get started immediately.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Input
                            label="Full Legal Name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Alex Smith"
                            className="bg-charcoal-50 dark:bg-charcoal-900 border-transparent focus:bg-white dark:focus:bg-charcoal-950"
                        />
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
                            label="Secure Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            className="bg-charcoal-50 dark:bg-charcoal-900 border-transparent focus:bg-white dark:focus:bg-charcoal-950"
                        />

                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-semibold text-charcoal-800 dark:text-charcoal-200">System Role</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="px-4 py-3 rounded-xl border bg-charcoal-50 dark:bg-charcoal-900 text-charcoal-900 dark:text-charcoal-50 border-transparent focus:bg-white dark:focus:bg-charcoal-950 hover:bg-charcoal-100 dark:hover:bg-charcoal-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-colors cursor-pointer"
                            >
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full gap-2 text-lg py-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 border-indigo-500">
                            {loading ? 'Setting up...' : 'Create Account'}
                            {!loading && <ArrowRight size={18} />}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-charcoal-500 dark:text-charcoal-400">
                        Already set up?{' '}
                        <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-bold transition-colors">
                            Log in instead
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
