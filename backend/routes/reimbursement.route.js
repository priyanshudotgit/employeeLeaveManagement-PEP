const express = require('express');
const router = express.Router();
const { createReimbursement, getMyReimbursements, getReimbursements, updateReimbursementStatus } = require('../controllers/reimbursement.controller.js');
const { protect, admin } = require('../middleware/auth.middleware.js');

router.route('/').post(protect, createReimbursement).get(protect, admin, getReimbursements);
router.route('/my').get(protect, getMyReimbursements);
router.route('/:id/status').put(protect, admin, updateReimbursementStatus);

module.exports = router;