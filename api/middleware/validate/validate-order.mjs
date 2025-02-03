import { validationResult } from 'express-validator'
import Product from '../../models/model-product.mjs'
import Order from '../../models/model-order.mjs'

// create order
export const validateCreateOrder = async (req, res, next) => {

    try {

        const ID = req.ID
        const { productID, quantity } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const order = await Order.findOne({ user : ID, product : productID } )
        switch (order) {
            case null:
                const product = await Product.findById({ _id : productID }).exec()
                if (product !== null) {
                    const data = {
                        product : product._id.toHexString(),
                        user: ID,
                        quantity : quantity ? quantity : 1,
                        created : new Date()
                    }
        
                    req.data = data
                    next()
                    return
                } else {
                    return res.status(404).json({message : 'Product is not available !'})
                }
            break;
            default : {
                return res.status(400).json({message : 'You have already ordered this product !'})
            }
        }
        

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }

}

// delete order
export const validateDeleteOrder = async (req, res, next) => {

    try {

        const ID = req.ID
        const id = req.params.id
        
        const order = await Order.findOne({ _id : id }).exec()
        if (order !== null) {
            if (order.user.toHexString() === ID) {
            
                req.data = id
                next()
            } else {
                return res.status(400).json({message : 'You are not the owner of this order !'})
            }
        } else return res.status(404).json({ message : 'Order ID is not available !'})
        
        

    } catch (err) {
        console.error(err)
        res.status(500).json({ message : 'Error system !'})
    }

}

// get by id order
export const validateGetByIdOrder = async (req, res, next) => {

    try {

        const ID = req.ID
        const id = req.params.id

        const order = await Order.findOne({ _id : id, user : ID }).exec()
        if (order !== null) {
            req.data = order._id
            next()
        } else {
            return res.status(400).json({
                message : 'Order is not available !'
            })
        }

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }
}