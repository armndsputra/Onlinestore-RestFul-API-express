import  express  from 'express'
const router = express()

import { createFeedback, getAllFeedback , getFeedbackByProduct} from '../controllers/controller-feedback.mjs'
import { roleCustomer, roleVendor } from '../middleware/role-based/role-based.mjs'
import roleAuthorization from '../middleware/role-authorization.mjs'
import { validateCreateFeedback, validateGetAllFeedback, validateGetFeedbackByProduct } from '../middleware/validate/validate-feedback.mjs'

router.post('/', roleAuthorization, roleCustomer, validateCreateFeedback, createFeedback) // customer

router.get('/', roleAuthorization, roleVendor, validateGetAllFeedback, getAllFeedback) // vendor

router.get('/:id', roleAuthorization, roleVendor, validateGetFeedbackByProduct, getFeedbackByProduct) // vendor

export default router