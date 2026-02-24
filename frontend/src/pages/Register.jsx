import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { MapPin } from 'lucide-react';

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
            const user = await register(formData);
            toast.success('Registration successful');
            navigate(`/${user.role}/dashboard`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-charcoal-50 dark:bg-charcoal-900 p-4 transition-colors">
            <div className="w-full max-w-md bg-white dark:bg-charcoal-950 p-8 rounded-2xl shadow-xl border border-charcoal-200 dark:border-charcoal-800">
                <div className="flex flex-col items-center mb-8 gap-2">
                    <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-full">
                        <MapPin size={32} />
                    </div>
                    <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                    <p className="text-charcoal-500 dark:text-charcoal-400 text-sm">Join EmpLMS today</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                    />
                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="••••••••"
                    />

                    <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="px-4 py-2.5 rounded-lg border bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-50 border-charcoal-200 dark:border-charcoal-800 hover:border-charcoal-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        >
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <Button type="submit" disabled={loading} className="w-full mt-2">
                        {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-charcoal-500 dark:text-charcoal-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-emerald-500 hover:text-emerald-600 font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
