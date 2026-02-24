import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { MapPin } from 'lucide-react';

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
            toast.success('Logged in successfully');
            navigate(`/${user.role}/dashboard`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
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
                    <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                    <p className="text-charcoal-500 dark:text-charcoal-400 text-sm">Sign in to your EmpLMS account</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    <Button type="submit" disabled={loading} className="w-full mt-2">
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-charcoal-500 dark:text-charcoal-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-emerald-500 hover:text-emerald-600 font-medium">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
