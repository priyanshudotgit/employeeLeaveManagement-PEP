import express from 'express';
import { getUsers, updateUserRole, deleteUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('admin'));

router.route('/').get(getUsers);
router.route('/:id/role').patch(updateUserRole);
router.route('/:id').delete(deleteUser);

export default router;