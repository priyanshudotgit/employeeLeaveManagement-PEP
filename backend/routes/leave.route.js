import express from 'express';
import { applyLeave, getMyLeaves, getTeamLeaves, approveLeave, rejectLeave } from '../controllers/leave.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/apply', applyLeave);
router.get('/my', getMyLeaves);

router.get('/team', authorizeRoles('manager', 'admin'), getTeamLeaves);
router.patch('/:id/approve', authorizeRoles('manager', 'admin'), approveLeave);
router.patch('/:id/reject', authorizeRoles('manager', 'admin'), rejectLeave);

export default router;