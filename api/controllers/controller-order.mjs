import Order from '../models/model-order.mjs';

// get all orders | customer
export const getAllOrders = async (req, res) => {
    
    try {

        const id = req.ID
       
        const orders = await Order.find({ customer : id})
        .select('product quantity _id')
        .populate('product','product user price stock category desc path')
        .exec()
        if (orders.length > 0) {
            res.status(200).json({
                message : 'succeed',
                count : orders.length,
                orders : orders.map(result => {
                    return {
                        _id : result._id,
                        quantity : result.quantity,
                        customer : result.customer,
                        order : result.product,
                       
                    }
                }),
            })
        } else return res.status(404).json({ message : "Orders is not available !" })
       
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }
}

// create order | customer
export const createOrder = async (req, res) => {
   
    try {
        
        const { product, quantity, customer, vendor, created } = req.data
        const order = (await Order.create({ product, quantity, customer, vendor, created }))
        return res.status(201).json({
            message : 'succeed',
            ordered : {
                _id : order._id,
                product : order.product,
                vendor : order.vendor,
                customer : order.customer,
                quantity : order.quantity,
                created : order.created
            }
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    }   
}

// delete order | customer
export const deleteByIdOreder = (req, res) => {

    const id = req.data

    Order.deleteOne({_id : id}).exec().then(result => {
        res.status(201).json({
            message : "succeed",
            deleted : result.deletedCount
        })
    }).catch(err => {
        console.error(err)
        res.status(500).json({
            message : 'Error system !',
        })
    })
    
}

// get by id order | customer
export const getByIdOrder = async (req, res) => {
    
    try {

        const id = req.data
        
        const order = await Order.findById(id)
        .select('product quantity')
        .populate('product','product price stock desc categort path created')
        .exec()

        res.status(201).json({
            message : 'succeed',
            order : order
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }
}