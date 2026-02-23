const Leave = require('../models/leave.model.js');

const applyLeave = async (req, res) => {
    const { leaveType, startDate, endDate, reason } = req.body;

    try {
        const leave = new Leave({
            user: req.user._id,
            leaveType,
            startDate,
            endDate,
            reason,
            approver: req.user.manager || null,
        });

        const createdLeave = await leave.save();
        res.status(201).json(createdLeave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ user: req.user._id });
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPendingLeaves = async (req, res) => {
    try {
        let leaves;
        if (req.user.role === 'Admin') {
            leaves = await Leave.find({}).populate('user', 'name email');
        } else {
            leaves = await Leave.find({ approver: req.user._id }).populate('user', 'name email');
        }
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLeaveStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const leave = await Leave.findById(req.params.id);

        if (leave) {
            if (req.user.role !== 'Admin' && leave.approver.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized to update this leave' });
            }

            leave.status = status;
            const updatedLeave = await leave.save();
            res.json(updatedLeave);
        } else {
            res.status(404).json({ message: 'Leave not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { applyLeave, getMyLeaves, getPendingLeaves, updateLeaveStatus };
