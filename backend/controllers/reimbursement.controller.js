const Reimbursement = require('../models/reimbursement.model.js');

const createReimbursement = async (req, res) => {
    const { amount, reason, receiptUrl } = req.body;

    try {
        const reimbursement = new Reimbursement({
            user: req.user._id,
            amount,
            reason,
            receiptUrl,
        });

        const createdReimbursement = await reimbursement.save();
        res.status(201).json(createdReimbursement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyReimbursements = async (req, res) => {
    try {
        const reimbursements = await Reimbursement.find({ user: req.user._id });
        res.json(reimbursements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReimbursements = async (req, res) => {
    try {
        const reimbursements = await Reimbursement.find({}).populate('user', 'name email');
        res.json(reimbursements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReimbursementStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const reimbursement = await Reimbursement.findById(req.params.id);

        if (reimbursement) {
            reimbursement.status = status;
            reimbursement.resolver = req.user._id;

            const updatedReimbursement = await reimbursement.save();
            res.json(updatedReimbursement);
        } else {
            res.status(404).json({ message: 'Reimbursement not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReimbursement, getMyReimbursements, getReimbursements, updateReimbursementStatus };