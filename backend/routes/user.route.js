import express from 'express';
import { getUsers, getManagers, updateUserRole, updateUserStatus, deleteUser, createUser, assignManager } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/managers', getManagers);

router.use(authorizeRoles('admin'));

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id/role').patch(updateUserRole);
router.route('/:id/status').patch(updateUserStatus);
router.route('/:id/manager').patch(assignManager);
router.route('/:id').delete(deleteUser);

export default router;