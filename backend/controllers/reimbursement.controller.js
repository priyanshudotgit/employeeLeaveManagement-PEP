import Reimbursement from '../models/reimbursement.model.js';

export const submitReimbursement = async (req, res) => {
    try {
        const { title, description, amount } = req.body;
        const reimbursement = await Reimbursement.create({
            employeeId: req.user._id,
            title,
            description,
            amount
        });
        res.status(201).json(reimbursement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyReimbursements = async (req, res) => {
    try {
        const reimbursements = await Reimbursement.find({ employeeId: req.user._id });
        res.json(reimbursements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllReimbursements = async (req, res) => {
    try {
        const reimbursements = await Reimbursement.find().populate('employeeId', 'name email');
        res.json(reimbursements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const resolveReimbursement = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const reimbursement = await Reimbursement.findById(req.params.id);
        if (!reimbursement) {
            return res.status(404).json({ message: 'Reimbursement not found' });
        }
        reimbursement.status = status;
        const updatedReimbursement = await reimbursement.save();
        res.json(updatedReimbursement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};