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
        ], validateCreateOrder, createOrder) // only customer account

router.get('/', roleAuthorization, roleCustomer, getAllOrders) // only customer account

router.delete('/:id', roleAuthorization, roleCustomer, validateDeleteOrder, deleteByIdOreder) // only customer account

router.get('/:id', roleAuthorization, roleCustomer, validateGetByIdOrder, getByIdOrder) // only customer account

export default router;