const express = require('express');
const router = express.Router();
const { applyLeave, getMyLeaves, getPendingLeaves, updateLeaveStatus } = require('../controllers/leave.controller.js');
const { protect, manager } = require('../middleware/auth.middleware.js');

router.route('/').post(protect, applyLeave);
router.route('/my').get(protect, getMyLeaves);
router.route('/pending').get(protect, manager, getPendingLeaves);
router.route('/:id/status').put(protect, manager, updateLeaveStatus);

module.exports = router;