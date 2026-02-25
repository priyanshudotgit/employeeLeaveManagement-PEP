import User from '../models/user.model.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').populate('managerId', 'name email');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getManagers = async (req, res) => {
    try {
        const managers = await User.find({ role: { $in: ['manager', 'admin'] } }).select('_id name email role');
        res.json(managers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, managerId } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'employee',
            managerId: managerId || null
        });

        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            managerId: user.managerId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignManager = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { managerId } = req.body;

        if (managerId) {
            const manager = await User.findById(managerId);
            if (!manager || !['manager', 'admin'].includes(manager.role)) {
                return res.status(400).json({ message: 'Invalid manager assignment' });
            }
        }

        user.managerId = managerId || null;
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            managerId: updatedUser.managerId
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { role } = req.body;
        if (!['admin', 'manager', 'employee'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }
        user.role = role;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.deleteOne({ _id: user._id });
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};