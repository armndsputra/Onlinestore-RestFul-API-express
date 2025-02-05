import { Router }  from 'express';
const router = Router();
import { body } from 'express-validator'

import { createOrder, deleteByIdOreder, getAllOrders, getByIdOrder } from '../controllers/controller-order.mjs'
import { validateCreateOrder, validateDeleteOrder, validateGetByIdOrder } from '../middleware/validate/validate-order.mjs'
import roleAuthorization from '../middleware/role-authorization.mjs';
import { roleCustomer } from '../middleware/role-based/role-based.mjs'

router.post('/',roleAuthorization, roleCustomer, [
            body('productID').isLength({ min: 1 }).trim(),
            body('quantity').isLength({ min: 0 }).trim(),
        ], validateCreateOrder, createOrder) // customer

router.get('/', roleAuthorization, roleCustomer, getAllOrders) // customer

router.delete('/:id', roleAuthorization, roleCustomer, validateDeleteOrder, deleteByIdOreder) // customer

router.get('/:id', roleAuthorization, roleCustomer, validateGetByIdOrder, getByIdOrder) // customer

export default router;