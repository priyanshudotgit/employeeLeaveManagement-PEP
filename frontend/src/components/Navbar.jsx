import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Menu } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white dark:bg-charcoal-950 border-b border-charcoal-200 dark:border-charcoal-800 transition-colors">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-charcoal-600 dark:text-charcoal-300" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <h2 className="text-xl font-semibold capitalize hidden sm:block">
                    {user ? `${user.role} Dashboard` : 'Dashboard'}
                </h2>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                {user && (
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium hidden md:block">{user.name}</span>
                        <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
