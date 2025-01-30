import { Router }  from 'express';
const router = Router();

import { getAllUsers, deleteByIdUser, getByIdUser } from '../controllers/controller-administration.mjs'
import roleAuthorization from '../middleware/role-authorization.mjs'
import { verificationDeleteUser, verificationGetByIdUser } from '../middleware/role-administration/verification-administration.mjs'
import roleAdministration from '../middleware/role-administration/role-administration.mjs'

/*
only administration
Step routing
routes -> middleware -> controller
------------------------------------------------
delete user = delete user orders !
*/

router.get('/users', roleAuthorization, roleAdministration, getAllUsers)

router.delete('/users/:id', roleAuthorization, roleAdministration, verificationDeleteUser, deleteByIdUser)

router.get('/users/:id', roleAuthorization, roleAdministration, verificationGetByIdUser, getByIdUser)

export default router