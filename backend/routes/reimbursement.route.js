import express from 'express';
import { submitReimbursement, getMyReimbursements, getAllReimbursements, resolveReimbursement } from '../controllers/reimbursement.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', submitReimbursement);
router.get('/my', getMyReimbursements);

router.get('/all', authorizeRoles('admin', 'manager'), getAllReimbursements);
router.patch('/:id/resolve', authorizeRoles('admin', 'manager'), resolveReimbursement);

export default router;