import { Router }  from 'express';
const router = Router();

import { getAllUsers, deleteByIdUser, getByIdUser } from '../controllers/controller-admin.mjs'
import roleAuthorization from '../middleware/role-authorization.mjs'
import { verificationDeleteUser, verificationGetByIdUser } from '../middleware/role-admin/verification-admin.mjs'
import roleAdmin from '../middleware/role-admin/role-admin.mjs'

/*
only administration
Step routing
routes -> middleware -> controller
------------------------------------------------
delete user = delete user orders !
*/

router.get('/users', roleAuthorization, roleAdmin, getAllUsers)

router.delete('/users/:id', roleAuthorization, roleAdmin, verificationDeleteUser, deleteByIdUser)

router.get('/users/:id', roleAuthorization, roleAdmin, verificationGetByIdUser, getByIdUser)

export default router