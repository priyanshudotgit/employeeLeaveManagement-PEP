import Leave from '../models/leave.model.js';
import User from '../models/user.model.js';

export const applyLeave = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;

        let managerId = req.user.managerId;

        if (!managerId) {
            if (req.user.role === 'manager' || req.user.role === 'admin') {
                const adminUser = await User.findOne({ role: 'admin' });
                if (adminUser) {
                    managerId = adminUser._id;
                } else {
                    return res.status(400).json({ message: 'No admin found to assign the leave request to.' });
                }
            } else {
                return res.status(400).json({ message: 'No manager assigned to you. Cannot apply for leave.' });
            }
        }

        const leave = await Leave.create({
            employeeId: req.user._id,
            leaveType,
            startDate,
            endDate,
            reason,
            managerId
        });

        res.status(201).json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ employeeId: req.user._id }).populate('managerId', 'name email');
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTeamLeaves = async (req, res) => {
    try {
        let leaves;
        if (req.user.role === 'admin') {
            leaves = await Leave.find().populate('employeeId', 'name email').populate('managerId', 'name email');
        } else {
            leaves = await Leave.find({ managerId: req.user._id }).populate('employeeId', 'name email');
        }
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const approveLeave = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) return res.status(404).json({ message: 'Leave request not found' });

        if (req.user.role !== 'admin' && leave.managerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to approve this leave' });
        }

        leave.status = 'approved';
        const updatedLeave = await leave.save();
        res.json(updatedLeave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const rejectLeave = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);
        if (!leave) return res.status(404).json({ message: 'Leave request not found' });

        if (req.user.role !== 'admin' && leave.managerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to reject this leave' });
        }

        leave.status = 'rejected';
        const updatedLeave = await leave.save();
        res.json(updatedLeave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};