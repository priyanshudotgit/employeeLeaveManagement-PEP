const express = require('express');
const router = express.Router();
const { getDashboardAnalytics } = require('../controllers/analytics.controller.js');
const { protect } = require('../middleware/auth.middleware.js');

router.route('/').get(protect, getDashboardAnalytics);

module.exports = router;