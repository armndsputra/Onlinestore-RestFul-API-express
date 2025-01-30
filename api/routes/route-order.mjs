import { Router }  from 'express';
const router = Router();
import { body } from 'express-validator'

import { createOrder, deleteByIdOreder, getAllOrders, getByIdOrder } from '../controllers/controller-order.mjs'
import { verificationCreateOrder, verificationDeleteOrder, verificationGetByIdOrder } from '../middleware/role-based/verification-order.mjs'
import roleAuthorization from '../middleware/role-authorization.mjs';
import { roleCustomer } from '../middleware/role-based/role-based.mjs'

router.post('/',roleAuthorization, roleCustomer, [
            body('productID').isLength({ min: 1 }).trim(),
            body('quantity').isLength({ min: 0 }).trim(),
        ], verificationCreateOrder, createOrder) // only customer account

router.get('/', roleAuthorization, roleCustomer, getAllOrders) // only customer account

router.delete('/:id', roleAuthorization, roleCustomer, verificationDeleteOrder, deleteByIdOreder) // only customer account

router.get('/:id', roleAuthorization, roleCustomer, verificationGetByIdOrder, getByIdOrder) // only customer account

export default router;