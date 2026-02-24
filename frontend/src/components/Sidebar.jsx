import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Calendar, ReceiptText, Users, MapPin, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { user } = useContext(AuthContext);

    if (!user) return null;

    const links = [
        { name: 'Dashboard', path: `/${user.role}/dashboard`, icon: <LayoutDashboard size={20} /> }
    ];

    if (user.role === 'employee') {
        links.push(
            { name: 'Apply Leave', path: '/employee/apply-leave', icon: <Calendar size={20} /> },
            { name: 'Reimbursements', path: '/employee/reimbursements', icon: <ReceiptText size={20} /> }
        );
    }

    if (user.role === 'manager' || user.role === 'admin') {
        links.push(
            { name: 'Team Leaves', path: '/manager/leaves', icon: <Calendar size={20} /> }
        );
    }

    if (user.role === 'admin') {
        links.push(
            { name: 'All Reimbursements', path: '/admin/reimbursements', icon: <ReceiptText size={20} /> },
            { name: 'User Management', path: '/admin/users', icon: <Users size={20} /> }
        );
    }

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-charcoal-900/50 z-20 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar container */}
            <aside
                className={`fixed md:static inset-y-0 left-0 w-64 bg-charcoal-900 text-charcoal-50 flex flex-col z-30 transform transition-transform duration-300 border-r border-charcoal-800 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="h-16 flex items-center justify-between px-6 border-b border-charcoal-800">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xl">
                        <MapPin size={24} />
                        <span>EmpLMS</span>
                    </div>
                    <button className="md:hidden text-charcoal-400 hover:text-white" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => {
                                if (window.innerWidth < 768) toggleSidebar();
                            }}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'text-charcoal-300 hover:bg-charcoal-800 hover:text-white'
                                }`
                            }
                        >
                            {link.icon}
                            <span className="font-medium">{link.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
