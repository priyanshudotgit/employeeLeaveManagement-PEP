const Leave = require('../models/leave.model.js');
const Reimbursement = require('../models/reimbursement.model.js');
const User = require('../models/user.model.js');

const getDashboardAnalytics = async (req, res) => {
    try {
        const role = req.user.role;
        let analytics = {};

        if (role === 'Admin') {
            // admin
            const totalEmployees = await User.countDocuments();
            const totalLeaves = await Leave.countDocuments();
            const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });
            const pendingReimbursements = await Reimbursement.countDocuments({ status: 'Pending' });

            const leaveDistribution = await Leave.aggregate([
                { $group: { _id: '$leaveType', count: { $sum: 1 } } }
            ]);

            const leaveDistributionData = leaveDistribution.map(item => ({
                name: item._id,
                value: item.count
            }));

            analytics = {
                totalEmployees,
                totalLeaves,
                pendingLeaves,
                pendingReimbursements,
                leaveDistribution: leaveDistributionData
            };
        } else if (role === 'Manager') {
            // manager
            const myTeamLeaves = await Leave.countDocuments({ approver: req.user._id });
            const myTeamPendingLeaves = await Leave.countDocuments({ approver: req.user._id, status: 'Pending' });

            analytics = {
                totalTeamLeaves: myTeamLeaves,
                pendingTeamLeaves: myTeamPendingLeaves
            };
        } else {
            // employee
            const myTotalLeaves = await Leave.countDocuments({ user: req.user._id });
            const myPendingLeaves = await Leave.countDocuments({ user: req.user._id, status: 'Pending' });
            const myApprovedLeaves = await Leave.countDocuments({ user: req.user._id, status: 'Approved' });

            analytics = {
                myTotalLeaves,
                myPendingLeaves,
                myApprovedLeaves
            };
        }

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardAnalytics };