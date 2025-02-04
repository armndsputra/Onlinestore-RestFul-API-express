import { Router }  from 'express';
const router = Router();

import { getAllUsers, deleteByIdUser, getByIdUser } from '../controllers/controller-admin.mjs'
import roleAuthorization from '../middleware/role-authorization.mjs'
import { validateDeleteUser, validateGetByIdUser } from '../middleware/validate/validate-admin.mjs'
import { roleAdmin } from '../middleware/role-based/role-based.mjs'

/*
only admin
Step routing
routes --> middleware --> controller
------------------------------------------------
-- delete user ( vendor and customer ) = delete all source files ( products, feedback ) user
*/

router.get('/users', roleAuthorization, roleAdmin, getAllUsers)

router.delete('/users/:id', roleAuthorization, roleAdmin, validateDeleteUser, deleteByIdUser)

router.get('/users/:id', roleAuthorization, roleAdmin, validateGetByIdUser, getByIdUser)

export default router