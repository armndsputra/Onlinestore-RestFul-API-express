import Order from '../models/model-order.mjs';

// get all orders
export const getAllOrders = async (req, res) => {
    
    try {

        const id = req.ID
       
        const orders = await Order.find({ user : id})
        .select('product quantity _id')
        .populate('product','product user price stock category desc path')
        .exec()
        console.log(orders)
        res.status(200).json({
            message : 'succeed',
            count : orders.length,
            orders : orders.map(result => {
                return {
                    _id : result._id,
                    quantity : result.quantity,
                    user : result.user,
                    order : result.product,
                   
                }
            }),
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message : 'Error system !'
        })
    }
}

// create order
export const createOrder = async (req, res) => {
   
    try {
        
        const { product, quantity, user, created } = req.data
        const order = (await Order.create({ product, quantity, user, created}))
        return res.status(201).json({
            message : 'succeed',
            ordered : {
                _id : order._id,
                product : order.product,
                user : order.user,
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

// delete order
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

// get by id order
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