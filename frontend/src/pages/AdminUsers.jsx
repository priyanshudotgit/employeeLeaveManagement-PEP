import { useState, useEffect } from 'react';
import api from '../services/api';
import { getManagers, createUser, assignManager, updateUserStatus } from '../services/user.service';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { motion } from 'framer-motion';
import TableSkeleton from '../components/ui/TableSkeleton';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Add User Form State
    const [showAddForm, setShowAddForm] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'employee', managerId: '' });
    const [addingUser, setAddingUser] = useState(false);

    const fetchData = async () => {
        try {
            const [usersRes, managersData] = await Promise.all([
                api.get('/users'),
                getManagers()
            ]);
            setUsers(usersRes.data);
            setManagers(managersData);
        } catch (error) {
            toast.error('Failed to load users data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRoleChange = async (id, newRole) => {
        try {
            await api.patch(`/users/${id}/role`, { role: newRole });
            toast.success('User role updated');
            fetchData();
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateUserStatus(id, newStatus);
            toast.success('User status updated');
            fetchData();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleManagerChange = async (userId, managerId) => {
        try {
            await assignManager(userId, managerId);
            toast.success('Manager assigned successfully');
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to assign manager');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await api.delete(`/users/${id}`);
            toast.success('User deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        setAddingUser(true);
        try {
            const payload = { ...newUser };
            if (payload.managerId === '') delete payload.managerId;

            await createUser(payload);
            toast.success('User created successfully');
            setShowAddForm(false);
            setNewUser({ name: '', email: '', password: '', role: 'employee', managerId: '' });
            fetchData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create user');
        } finally {
            setAddingUser(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-charcoal-900 dark:text-white">User Management</h2>
                    <p className="text-charcoal-500 dark:text-charcoal-400 mt-1">Add, update, and remove users across the platform.</p>
                </div>
                <Button onClick={() => setShowAddForm(!showAddForm)}>
                    {showAddForm ? 'Cancel Form' : 'Add New User'}
                </Button>
            </div>

            {showAddForm && (
                <motion.div
                    initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    animate={{ opacity: 1, height: 'auto', overflow: 'visible' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    className="bg-white dark:bg-charcoal-950 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm"
                >
                    <h3 className="text-xl font-bold tracking-tight mb-6">Create New User</h3>
                    <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required />
                        <Input label="Email" type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required />
                        <Input label="Password" type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} required />

                        <div className="flex flex-col gap-1.5 w-full">
                            <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Role</label>
                            <select
                                value={newUser.role}
                                onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                                className="px-4 py-2.5 rounded-lg border bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-50 border-charcoal-200 dark:border-charcoal-800 hover:border-charcoal-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                            >
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {newUser.role === 'employee' && (
                            <div className="flex flex-col gap-1.5 w-full">
                                <label className="text-sm font-medium text-charcoal-700 dark:text-charcoal-300">Assign Manager</label>
                                <select
                                    value={newUser.managerId}
                                    onChange={e => setNewUser({ ...newUser, managerId: e.target.value })}
                                    className="px-4 py-2.5 rounded-lg border bg-white dark:bg-charcoal-950 text-charcoal-900 dark:text-charcoal-50 border-charcoal-200 dark:border-charcoal-800 hover:border-charcoal-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                                >
                                    <option value="">No Manager / Leave Empty</option>
                                    {managers.map(manager => (
                                        <option key={manager._id} value={manager._id}>
                                            {manager.name} ({manager.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="md:col-span-2 flex justify-end mt-2">
                            <Button type="submit" disabled={addingUser}>
                                {addingUser ? 'Creating...' : 'Create User'}
                            </Button>
                        </div>
                    </form>
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-charcoal-950 p-6 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 shadow-sm"
            >
                {loading ? (
                    <TableSkeleton rows={5} />
                ) : users.length === 0 ? (
                    <p className="text-charcoal-500">No users found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr className="border-b border-charcoal-200 dark:border-charcoal-800 text-charcoal-500 dark:text-charcoal-400">
                                    <th className="py-3 px-4">Name</th>
                                    <th className="py-3 px-4">Email</th>
                                    <th className="py-3 px-4">Role</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Manager</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} className="border-b border-charcoal-100 dark:border-charcoal-800/50">
                                        <td className="py-3 px-4 font-medium">{u.name}</td>
                                        <td className="py-3 px-4">{u.email}</td>
                                        <td className="py-3 px-4">
                                            <select
                                                value={u.role}
                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                className="p-1 rounded bg-charcoal-50 dark:bg-charcoal-900 border border-charcoal-200 dark:border-charcoal-800 focus:outline-none"
                                            >
                                                <option value="employee">Employee</option>
                                                <option value="manager">Manager</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-4">
                                            <select
                                                value={u.status || 'pending'}
                                                onChange={(e) => handleStatusChange(u._id, e.target.value)}
                                                className={`p-1 rounded border border-charcoal-200 dark:border-charcoal-800 focus:outline-none ${u.status === 'active' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : u.status === 'inactive' ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600'}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </td>
                                        <td className="py-3 px-4">
                                            <select
                                                value={u.managerId?._id || u.managerId || ''}
                                                onChange={(e) => handleManagerChange(u._id, e.target.value)}
                                                disabled={u.role !== 'employee'}
                                                className={`p-1 w-32 truncate rounded border border-charcoal-200 dark:border-charcoal-800 focus:outline-none 
                                                    ${u.role !== 'employee' ? 'bg-charcoal-100 dark:bg-charcoal-800 text-charcoal-400 cursor-not-allowed' : 'bg-charcoal-50 dark:bg-charcoal-900'}`}
                                            >
                                                <option value="">None</option>
                                                {managers.map(manager => (
                                                    <option key={manager._id} value={manager._id}>
                                                        {manager.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="py-3 px-4">
                                            <Button onClick={() => handleDelete(u._id)} variant="danger" className="text-xs px-3 py-1.5">Delete</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};
export default AdminUsers;
