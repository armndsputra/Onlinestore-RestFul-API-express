import { Router }  from 'express';
const router = Router();

import roleAuthorization from '../middleware/role-authorization.mjs'
import { roleVendor} from '../middleware/role-based/role-based.mjs'
import { validateGetAllOrdered} from '../middleware/validate/validate-ordered.mjs'
import { getAllOrdered} from '../controllers/controller-ordered.mjs'

router.get('/', roleAuthorization, roleVendor, validateGetAllOrdered, getAllOrdered); // vendor

export default router;