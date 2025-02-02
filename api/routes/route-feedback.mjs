import  express  from 'express'
const router = express()

import { createFeedback } from '../controllers/controller-feedback.mjs'
import { roleCustomer } from '../middleware/role-based/role-based.mjs'
import roleAuthorization from '../middleware/role-authorization.mjs'
import { validateCreateFeedback } from '../middleware/validate/validate-feedback.mjs'

router.post('/', roleAuthorization, roleCustomer, validateCreateFeedback, createFeedback)

export default router